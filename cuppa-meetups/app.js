const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const Meetup = require('./models/meetup');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-meetups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));

app.get('/healthCheck', (req, res) => res.send());

const meetupController = require('./controllers/meetups');
app.post('/meetups', meetupController.newMeetup);
app.get('/meetups', meetupController.getMeetup);

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

app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})