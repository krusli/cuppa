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
const GroupsService = require('./services/GroupsService');
const groupsService = new GroupsService(UsersService, Group);

const errorHandler = (res, err, next) => {
    if (err.name === 'CastError') {
        res.status(400).send(err.message);
        return;
    } 
    
    else if (err.name === 'ValidationError') {
        res.status(400).send(err.message);
        return;
    }
    
    else {
        console.error(err);
        if (next) {
            next(err);
        }
    }
};

app.get('/healthCheck', (req, res) => res.send());

const ActivityService = require('../common/activity');

app.post('/groups', async (req, res, next) => {
    // validate request
    const name = req.body.name;
    const description = req.body.description;

    try {
        // get own profile (also, validates token by delegating to the Auth/Users server)
        const user = await this.getUserMe(req, res);

        const group = await groupsService.newGroup(user, name, description);

        // notify Activity service (async)
        ActivityService.newActivity(req, res, {
            user: user._id,
            subject: group._id,
            subjectType: 'Group',
            action: 'Created'
        });

        res.json(group);
    } catch (err) {

        if (err.message == 'missing_param_name') {
            res.status(400).send({
                error: 'bad_request',
                message: 'Invalid request.'
            });
            return;
        }

        errorHandler(res, err, next);
    }
});

app.get('/groups', async (req, res, next) => {
    try {
        const groups = await groupsService.getGroups();
        res.json(groups);
    } catch (err) {
        errorHandler(res, err, next);
    }
});

app.get('/groups/:groupId', async (req, res, next) => {
    try {
        const group = await groupsService.getGroupById(req.params.groupId);
        res.json(group);
    } catch (err) {
        errorHandler(res, err, next);
    }
});

app.get('/me/groups', async (req, res, next) => {
    console.log('/me/groups');
    try {
        const groups = await groupsService.getGroupsMe(req, res);
        res.json(groups);
    } catch (err) {
        errorHandler(res, err, next);
    }
});

// gets a group, that the user is a member of
app.get('/me/groups/:groupId', async (req, res, next) => {
    try {
        const group = await groupsService.getGroupByIdMe(req.params.groupId, req, res);
        res.json(group);
    } catch (err) {
        errorHandler(res, err, next);
    }
});

// leave a group
// app.delete('me/groups/:groupId')

app.post('/groups/:groupId/members', async (req, res, next) => {
    if (!req.body.username) {
        res.status(400).send({
            error: 'bad_request',
            message: 'Missing parameter: username'
        });
        return;
    }

    try {
        const groupNew = await groupsService.newMember(req.params.groupId, req.body.username, req, res);
        res.json(groupNew);
    } catch (err) {
        if (err.message === 'invalid_param_groupId') {
            res.status(404).send(); // no group found
            return;
        }

        else {
            errorHandler(res, err, next);
        }

    }
});

app.listen(3001, () => {
    console.log('Server listening on port 3001.');
});
