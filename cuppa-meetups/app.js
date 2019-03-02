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
const validateMeetup = require('./controllers/middleware').validateMeetup;

const meetupController = require('./controllers/meetups');
app.post('/meetups', meetupController.newMeetup);
app.get('/meetups', meetupController.getMeetups);
app.get('/meetups/:meetupId', validateMeetup, meetupController.getMeetup);

const teamsController = require('./controllers/teams');
app.get('/meetups/:meetupId/teams', validateMeetup, teamsController.getTeams);
app.post('/meetups/:meetupId/teams', validateMeetup, teamsController.newTeam);
app.delete('/meetups/:meetupId/teams/:teamId', validateMeetup, teamsController.deleteTeam);

const rolesController = require('./controllers/roles');
app.post('/roles', rolesController.newRole);
app.get('/roles', rolesController.getRoles)

app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})
