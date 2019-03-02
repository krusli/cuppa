const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-meetups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));

app.get('/healthCheck', (req, res) => res.send());

// TODO unify with implementation in meetups.js (controllers)
const validateAndGetMeetup = require('./controllers/middleware').validateAndGetMeetup;

const meetupController = require('./controllers/meetups');
app.post('/meetups', meetupController.newMeetup);
app.get('/meetups', meetupController.getMeetups);
app.get('/meetups/:meetupId', validateAndGetMeetup, meetupController.getMeetup);
app.post('/meetups/:meetupId/attendees', validateAndGetMeetup, meetupController.newAttendee);

const teamsController = require('./controllers/teams');
app.get('/meetups/:meetupId/teams', validateAndGetMeetup, teamsController.getTeams);
app.post('/meetups/:meetupId/teams', validateAndGetMeetup, teamsController.newTeam);
app.delete('/meetups/:meetupId/teams/:teamId', validateAndGetMeetup, teamsController.deleteTeam);

const eventsController = require('./controllers/events');
app.get('/meetups/:meetupId/events', validateAndGetMeetup, eventsController.getEvents);
app.post('/meetups/:meetupId/events', validateAndGetMeetup, eventsController.newEvent);
app.delete('/meetups/:meetupId/events/:eventId', validateAndGetMeetup, eventsController.deleteEvent);


const rolesController = require('./controllers/roles');
app.post('/roles', rolesController.newRole);
app.get('/roles', rolesController.getRoles)

app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})
