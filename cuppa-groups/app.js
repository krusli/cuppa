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

app.get('/healthCheck', (req, res) => res.send());

app.post('/groups', async (req, res, next) => {
    // validate request
    const name = req.body.name;
    const description = req.body.description;

    if (!name) {
        res.status(422).send({
            error: 'invalid_request',
            message: 'Invalid request.'
        });
        return;
    }

    try {
        const user = await getUser(req);

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
        const user = await getUser(req);
        const groups = await Group.find({ members: user._id })    // contains userID
        res.json(groups);
    } catch(err) {
        next(err);
    }
    
})

// gets a group, that the user is a member of
app.get('/groups/:groupId', async (req, res, next) => {
    try {
        const user = await getUser(req);
        const group = await Group.findOne({ members: user._id, _id: req.params.groupId })
        res.json(group);
    } catch (err) {
        next(err);
    }
})

// TODO get group (open) (only public-facing contents)

app.listen(3001, () => {
    console.log('Server listening on port 3001.')
})