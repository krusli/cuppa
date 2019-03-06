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
        console.log('CastError');
        res.status(400).send();
    } else {
        console.error(err);
        if (next) {
            next(err);
        }
    }
};

app.get('/healthCheck', (req, res) => res.send());

app.post('/groups', async (req, res, next) => {
    // validate request
    const name = req.body.name;
    const description = req.body.description;

    try {
        const group = await groupsService.newGroup(name, description, req, res);
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
