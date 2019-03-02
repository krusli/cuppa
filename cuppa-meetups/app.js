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

// app.post('/meetups/:meetupId/teams', async (req, res, next) => {
//     try {
//         // get all the users' groups
//         const groups = await getGroups(req);
//         const groupIds = groups.map(x => x._id);

//         // get the meetup, check if the group it points to is in groupIds
//         // req.params.meetupId IN groupIds (TODO)

//         const meetup = await Meetup.findById(req.params.meetupId);
//         meetup.teams.push(req.body) // TODO validation
//         meetup
//     }
//     catch (error) {
//         next(error);
//     }
// })

// app.post('/meetups/:meetupId/events', async (req, res, next) => {

// })


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

app.post('/meetups/:meetupId/teams', async (req, res, next) => {
    try {
        // get all the user's groups
        const groups = await getGroups(req);
        const groupIds = groups.map(x => x._id);

        // get the meetup, check if the group it points to is in groupids
        const meetup = await Meetup.findById(req.params.meetupId);
        if (!meetup) {
            res.status(404).send();
            return;
        }

        const groupIdsFiltered = groupIds.filter(x => x == meetup.group);
        if (groupIdsFiltered.length === 0) {
            res.status(401).send();
            return;
        } 

        // now authenticated, can add a new team
        meetup.teams.push({})
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
