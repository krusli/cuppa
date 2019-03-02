const interservice = require('../../common/interservice'); // inter-service comms
const getGroup = interservice.getGroup;
const getGroups = interservice.getGroups;
const getUser = interservice.getUser;

const Meetup = require('../models/meetup');

module.exports = {
    newMeetup: async (req, res, next) => {
        try {
            const name = req.body.name;
            const description = req.body.description;
            const groupId = req.body.group;

            if (!groupId || !name) {
                res.status(422).send({
                    error: 'invalid_request',
                    message: 'Invalid request.'
                });
                return;
            }

            // make sure user can access the group
            // TODO this should just be middleware.
            const group = await getGroup(req, groupId);
            const user = await getUser(req);
            if (!group) {
                res.status(401).send({
                    error: 'unauthorized',
                    message: 'You are not authorized to perform this action.'
                })
                return;
            }

            // create the meetup
            const meetup = await Meetup.create({
                name,
                description,
                group: groupId,
                attendees: [],
                owner: user._id
            });

            res.json(meetup);
        }
        catch (error) {
            next(error);
        }
    },

    getMeetup: async (req, res, next) => {
        try {
            const groups = await getGroups(req);
            const groupIds = groups.map(x => x._id);

            const meetups = await Meetup.find({
                group: {
                    $in: groupIds
                }
            });
            res.json(meetups);
        }
        catch (error) {
            next(error);
        }
    }
}