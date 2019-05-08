const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const Group = require('./models/group');
const GroupsService = require('./services/groupsService');

/* External */
const ActivityService = require('./common/activity');
const UsersService = require('./common/users');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const mongoose = require('mongoose');
function createConnection(dbURL, options) {
    var db = mongoose.createConnection(dbURL, options);

    db.on('error', function (err) {
        // If first connect fails because mongod is down, try again later.
        // This is only needed for first connect, not for runtime reconnects.
        // See: https://github.com/Automattic/mongoose/issues/5169
        if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
            console.log(new Date(), String(err));

            // Wait for a bit, then try to connect again
            setTimeout(function () {
                console.log("Retrying first connect...");
                db.openUri(dbURL).catch(() => { });
                // Why the empty catch?
                // Well, errors thrown by db.open() will also be passed to .on('error'),
                // so we can handle them there, no need to log anything in the catch here.
                // But we still need this empty catch to avoid unhandled rejections.
            }, 20 * 1000);
        } else {
            // Some other error occurred.  Log it.
            console.error(new Date(), String(err));
        }
    });

    db.once('open', function () {
        console.log("Connection to db established.");
    });

    return db;
}

// Use it like
var db = createConnection('mongodb://mongo:27017/cuppa-users', { useNewUrlParser: true });

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


app.post('/groups', async (req, res, next) => {
    // validate request
    const name = req.body.name;
    const description = req.body.description;

    try {
        // get own profile (also, validates token by delegating to the Auth/Users server)
        const user = await UsersService.getUserMe(req, res);

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
