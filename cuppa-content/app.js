const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/cuppa-meetups', { useNewUrlParser: true })
//   .then(() => console.log('Connected to MongoDB'), err => console.log(err));

/**
 * Contents microservice.
 * 
 * Point of contact for the SPA (except for auth, which goes directly to auth servers).
 * 
 * Aggregates contents from the different services for presentation on the client.
 * Also handles client services and forwards them to the right server(s).
 */

const sendData = (req, res) => res.json(req.data);

const middleware = require('./middleware');
app.get('/groups/', middleware.getGroups, sendData);
app.get('/groups/:groupId', middleware.getGroup, sendData);

// TODO move to controllers
const getGroup = require('../common/groups').getGroup;
const getGroupsMe = require('../common/groups').getGroupsMe;
const joinGroup = require('../common/groups').joinGroup;

app.post('/me/groups', async (req, res, next) => {
  if (!req.body.group) {
    res.status(400).send({
      error: 'bad_request',
      message: 'Missing parameter: group (ObjectId)'
    });
  }

  try {
    const groupId = req.body.group;
    const group = await getGroup(req, res, groupId);

    
    const joined = await joinGroup(req, res, group._id);
    res.json(joined);
  } catch (err) {
    next(err);
  }
  // res.json(group);
  // pass request to groups server
})

app.get('/communities/featured', (req, res) => {
  res.json([
    {
      name: "Writing"
    },
    {
      name: "DIY"
    },
    {
      name: "Mech Keys"
    },
    {
      name: "Headphones"
    },
    {
      name: "Manga"
    },
    {
      name: "Anime"
    }
  ]);
});

app.listen(3003, () => {
  console.log('Server listening on port 3003.');
});
