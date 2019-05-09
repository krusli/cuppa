const interservice = require('../common/interservice');
const getGroups = interservice.getGroups;

const Meetup = require('../models/meetup');
const Role = require('../models/role');

const validateAndGetMeetup = async (req, res, next) => {
    const groups = await getGroups(req, res);
    const groupIds = groups.map(x => x._id);

    try {
        const meetup = await Meetup.findOne({
            _id: req.params.meetupId,
            group: {
                $in: groupIds
            }
        });

        if (!meetup) {
            res.status(404).send();
            return;
        }

        req.groups = groups;
        req.meetup = meetup;
        next();
    } catch (err) {
        next(err);
    }

}

module.exports = {
    validateAndGetMeetup,

    validateAndGetMeetupAndRole: async (req, res, next) => {
        // req.body.role (ObjectId)
        validateAndGetMeetup(req, res, async () => {
            const roleId = req.body.role;

            // now we have req.meetup if any
            const groups = req.groups.filter(x => x._id == req.meetup.group);
            if (!groups) {
                res.status(404).send();
                return;
            }
            const group = groups[0];

            // TODO Promise.all + flatten (simultaneous)
            // find Roles in the base collection
            const role = await Role.findById(roleId);

            // find group-specific role
            const rolesGroup = group.roles.filter(x => x._id == roleId);

            // find meetup-specific role
            const rolesMeetup = req.meetup.roles.filter(x => x._id == roleId);

            // similar logic to how Node.js scans for modules/dependencies (node_modules)
            if (rolesMeetup.length) {
                // console.log('Got Meetup-local role');
                req.role = rolesMeetup[0];
                next();
                return;
            }
            else if (rolesGroup.length) {
                // requested role is not in the meetup, check the group
                // console.log('Got Group-local role');
                req.role = rolesGroup[0];
                next();
                return;
            }
            else if (role) {
                // console.log('Got global role');
                req.role = role;
                next();
                return;
            } 
            else {
                // otherwise, no role
                res.status(400).send({
                    error: 'bad_request',
                    message: 'Invalid parameter role (needs a valid _id of a Role inside a Group/Meetup or within the Meetups Microservice.'
                })

            }


        })
    }
}
