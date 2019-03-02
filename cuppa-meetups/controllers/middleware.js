const interservice = require('../../common/interservice');
const getGroups = interservice.getGroups;

const Meetup = require('../models/meetup');

module.exports = {
    validateMeetup: async (req, res, next) => {
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

            req.meetup = meetup;
            next();
        } catch (err) {
            next(err);
        }
        
    }
}