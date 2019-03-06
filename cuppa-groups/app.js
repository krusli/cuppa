const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const Group = require('./models/group');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-groups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));

const UsersService = require('../common/users');
const getUser = UsersService.getUser;
const getUserMe = UsersService.getUserMe;

const GroupsService = require('./services/groupsService');
const groupsService = new GroupsService(UsersService, Group);

app.get('/healthCheck', (req, res) => res.send());

app.post('/groups', async (req, res, next) => {
    // validate request
    const name = req.body.name;
    const description = req.body.description;

    try {
        const group = await groupsService.newGroup(name, description, req, res);
        res.json(group);
    } catch (err) {
        console.error(err);

        if (err.message == 'missing_param_name') {
            res.status(400).send({
                error: 'bad_request',
                message: 'Invalid request.'
            });
            return;
        }

        next(err);
    }
});

app.get('/groups', async (req, res, next) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

app.get('/groups/:groupId', async (req, res, next) => {
    try {
        const group = await Group.findOne({ _id: req.params.groupId });
        res.json(group);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

app.get('/me/groups', async (req, res, next) => {
    try {
        const user = await getUserMe(req, res);
        const groups = await Group.find({ members: user._id });    // contains userID

        res.json(groups);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

// gets a group, that the user is a member of
app.get('/me/groups/:groupId', async (req, res, next) => {
    try {
        const user = await getUserMe(req, res);
        const group = await Group.findOne({ members: user._id, _id: req.params.groupId })
        res.json(group);
    } catch (err) {
        next(err);
    }
})

/**
 * Adds a user to a group.
 * 
 * At this point in time, anyone can invite any valid user into a group.)
 */
app.post('/groups/:groupId/members', async (req, res, next) => {
    if (!req.body.username) {
        res.status(400).send({
            error: 'bad_request',
            message: 'Missing parameter: username'
        });
        return;
    }

    try {
        const user = await getUserMe(req, res);
        const group = await Group.findOne({ members: user._id, _id: req.params.groupId });

        if (!group) {
            res.status(404).send(); // no group found
            return;
        }

        // validate the other user
        const invitedUser = await getUser(req, res, req.body.username);
        if (!invitedUser) {
            res.status(400).send({
                error: 'bad_request',
                message: 'user to invite does not exist'
            });
        }

        // TODO check, don't push extras
        if (!group.members.map(x => x.toString()).includes(invitedUser._id.toString())) {
            group.members.push(invitedUser._id);
        }
        const groupNew = await group.save();
        res.json(groupNew);

        // otherwise, the group exists
        // update it with the new member
    } catch (err) {
        next(err);
    }
});

app.listen(3001, () => {
    console.log('Server listening on port 3001.');
})
