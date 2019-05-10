const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
const setupConnection = () => {
    mongoose.connect('mongodb://mongo:27017/cuppa-meetups', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'),
            err => {
                console.error(err);
                setTimeout(() => setupConnection(), 1000);  // wait 1s, reconnect
            });
};
setupConnection();

app.get('/healthCheck', (req, res) => res.send());

// TODO unify with implementation in meetups.js (controllers)
const validateAndGetMeetup = require('./controllers/middleware').validateAndGetMeetup;
const validateAndGetMeetupAndRole = require('./controllers/middleware').validateAndGetMeetupAndRole;

const meetupController = require('./controllers/meetups');
app.post('/meetups', meetupController.newMeetup);
app.get('/meetups', meetupController.getMeetups);
app.get('/meetups/:meetupId', validateAndGetMeetup, meetupController.getMeetup);
app.post('/meetups/:meetupId/attendees', validateAndGetMeetup, meetupController.newAttendee);

const teamsController = require('./controllers/teams');
app.get('/meetups/:meetupId/teams', validateAndGetMeetup, teamsController.getTeams);
app.get('/meetups/:meetupId/teams/:teamId', validateAndGetMeetup, teamsController.getTeam);
app.post('/meetups/:meetupId/teams', validateAndGetMeetup, teamsController.newTeam);
app.delete('/meetups/:meetupId/teams/:teamId', validateAndGetMeetup, teamsController.deleteTeam);
app.post('/meetups/:meetupId/teams/:teamId/role', validateAndGetMeetupAndRole, teamsController.newrolesAndUsers);
app.post('/meetups/:meetupId/teams/:teamId/member', validateAndGetMeetupAndRole, teamsController.newTeamMember);
// TODO add people to the team (people must be attendees)
// app.post('/meetups/:meetupId/teams/:teamId/member)
/*
{
    role: ObjectId (Role ID)
}
*/

const eventsController = require('./controllers/events');
app.get('/meetups/:meetupId/events', validateAndGetMeetup, eventsController.getEvents);
app.get('/meetups/:meetupId/events/:eventId', validateAndGetMeetup, eventsController.getEvent);
app.post('/meetups/:meetupId/events', validateAndGetMeetup, eventsController.newEvent);
app.delete('/meetups/:meetupId/events/:eventId', validateAndGetMeetup, eventsController.deleteEvent);
app.post('/meetups/:meetupId/events/:eventId/requiredRoles', validateAndGetMeetupAndRole, eventsController.newRequiredRole);

const rolesController = require('./controllers/roles');
app.post('/roles', rolesController.newRole);
app.get('/roles', rolesController.getRoles)
// app.post('/meetups/:meetupId/roles')
// app.post('/groups/:meetupId/roles')  // in Groups Microservice, TODO


app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})
