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
 * Point of contact for the SPA (except for auth, which goes directly to auth servers).
 * Aggregates contents from the different services for presentation on the client.
 */

const sendData = (req, res) => res.json(req.data);

const middleware = require('./middleware');
app.get('/groups/', middleware.getGroups, sendData);
app.get('/groups/:groupId', middleware.getGroup, sendData);

app.get('/communities/featured', (req, res) => {
  res.json([
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
