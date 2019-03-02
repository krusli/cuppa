const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const Role = require('./models/role');
const Meetup = require('./models/meetup');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const interservice = require('../common/interservice');
const getGroups = interservice.getGroups;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-meetups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));

app.get('/healthCheck', (req, res) => res.send());

const meetupController = require('./controllers/meetups');
app.post('/meetups', meetupController.newMeetup);
app.get('/meetups/:meetupId', meetupController.getMeetup);
app.get('/meetups', meetupController.getMeetups);

app.post('/roles', async (req, res, next) => {
    // TODO verify token
    // TODO try catch

    if (!req.body.name) {
        res.status(400).send({
            error: 'bad_request',
            message: 'missing param: name'
        });
    }

    const role = await Role.create({
        name: req.body.name
    });

    res.json(role);
});

// TODO unify with implementation in meetups.js (controllers)
const validateMeetup = async (req, res, next) => {
    const groups = await getGroups(req);
    const groupIds = groups.map(x => x._id);

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
}

app.delete('/meetups/:meetupId/teams/:teamId', validateMeetup, async (req, res, next) => {
    try {
        const meetup = req.meetup;
        meetup.teams = meetup.teams.filter(x => x._id != req.params.teamId);

        await meetup.save();
        res.send();
    } catch (err) {
        next(err);
    }
})


app.post('/meetups/:meetupId/teams', validateMeetup, async (req, res, next) => {
    const name = req.body.name;
    if (!name) {
        res.status(400).send({
            error: 'bad_request',
            message: 'missing param: name'
        });
    }

    try {
        const meetup = req.meetup;
        // now authenticated, can add a new team
        meetup.teams.push({
            name
        })
        const meetupSaved = await meetup.save();

        res.status(201).location(`/meetups/${meetup._id}/teams`).json(meetupSaved.teams);
    } catch (error) {
        next(error);
    }
});


app.get('/roles', async (req, res) => {
    const roles = await Role.find();
    res.json(roles);
})

app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})
