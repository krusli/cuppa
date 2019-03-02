const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const Group = require('./models/group');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-groups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));


const interservice = require('../common/interservice'); // inter-service comms
const getUser = interservice.getUser;
const getUserMe = interservice.getUserMe;

app.get('/healthCheck', (req, res) => res.send());

app.post('/groups', async (req, res, next) => {
    // validate request
    const name = req.body.name;
    const description = req.body.description;

    if (!name) {
        res.status(400).send({
            error: 'invalid_request',
            message: 'Invalid request.'
        });
        return;
    }

    try {
        const user = await getUserMe(req, res);

        const owner = user._id;
        const group = await Group.create({
            name,
            description,
            members: [owner],
            owner
        })

        res.json(group);
    } catch (err) {
        next(err);
    }
})

app.get('/groups', async (req, res, next) => {
    try {
        const user = await getUserMe(req, res);
        const groups = await Group.find({ members: user._id })    // contains userID
        res.json(groups);
    } catch(err) {
        next(err);
    }
    
})

// gets a group, that the user is a member of
app.get('/groups/:groupId', async (req, res, next) => {
    try {
        const user = await getUserMe(req, res);
        const group = await Group.findOne({ members: user._id, _id: req.params.groupId })
        res.json(group);
    } catch (err) {
        next(err);
    }
})

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
        const invitedUser = await getGroups(req, res, req.body.username);
        if (!invitedUser) {
            res.status(400).send({
                error: 'bad_request',
                message: 'user to invite does not exist'
            });
        }

        group.members.push(invitedUser._id);
        const groupNew = await group.save();
        res.json(groupNew);

        // otherwise, the group exists
        // update it with the new member
    } catch (err) {
        next(err);
    }
});

// app.post('/groups/:groupId/events', async (req, res, next) => {
//     try {
//         const user = await getUserMe(req, res);
//         const group = await Group.findOne({ members: user._id, _id: req.params.groupId });

//         if (!group) {
//             res.status(404).send(); // no group found
//             return;
//         }

//         // TODO validate body



        
//     } catch (err) {
//         next(err);
//     }
// });
// TODO get group (open) (only public-facing contents)

app.listen(3001, () => {
    console.log('Server listening on port 3001.')
})
