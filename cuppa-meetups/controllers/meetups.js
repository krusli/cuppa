const interservice = require('../../common/interservice'); // inter-service comms
const getGroup = interservice.getGroup;
const getGroups = interservice.getGroups;
const getUser = interservice.getUser;
const getUserMe = interservice.getUserMe;

const Meetup = require('../models/meetup');

const getMeetupsForGroup = async (req, res, next) => {
    try {
        const group = await getGroup(req, res, req.query.groupId);
        if (!group) {
            // wrong group
            res.status(404).send();
            return;
        }
        const meetups = await Meetup.find({
            group: group._id
        });
        res.json(meetups);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    newMeetup: async (req, res, next) => {
        try {
            const name = req.body.name;
            const description = req.body.description;
            const groupId = req.body.group;

            if (!groupId || !name) {
                res.status(400).send({
                    error: 'bad_request',
                    message: 'Invalid request.'
                });
                return;
            }

            // make sure user can access the group
            // TODO this should just be middleware.
            const group = await getGroup(req, res, groupId);
            const user = await getUserMe(req, res);
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
            res.json(req.meetup);
        }
        catch (error) {
            next(error);
        }
    },

    getMeetupsForGroup,

    getMeetups: async (req, res, next) => {
        try {
            if (req.query.groupId) {
                return getMeetupsForGroup(req, res, next);
            }

            const groups = await getGroups(req, res);
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
    },

    newAttendee: async (req, res, next) => {
        // check if username is in req.body
        const username = req.body.username;
        if (!username) {
            res.status(400).send({
                error: 'bad_request',
                message: 'Invalid request.'
            });
            return;
        }

        // try to get the user
        const user = await getUser(req, res, username);
        if (!user) {
            res.status(400).send({
                error: 'bad_request',
                message: 'Invalid username.'
            });
            return;
        }

        req.meetup.attendees.push(user._id);
        const meetupSaved = await req.meetup.save();

        // TODO Location
        res.status(201).json(meetupSaved.attendees);
    }
}
