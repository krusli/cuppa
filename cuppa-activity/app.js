const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
const setupConnection = () => {
  mongoose.connect('mongodb://mongo:27017/cuppa-activity', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'),
      err => {
        console.error(err);
        setTimeout(() => setupConnection(), 1000);  // wait 1s, reconnect
      });
};
setupConnection();

/**
 * Activity Microservice [Internal]
 * 
 * Internal - do not expose to users directly. Only other Microservices should be allowed
 * to create Activities.
 * All activities are published here (e.g. created group, joined group, etc.)
 */

const Activity = require('./models/activity');

/* TODO de-duplicate between -activity and -groups */
const errorHandler = (res, err, next) => {

  if (err && err.name === 'CastError') {
    res.status(400).send(err.message);
    return;
  }

  else if (err && err.name === 'ValidationError') {
    res.status(400).send(err.message);
    return;
  }

  else {
    console.error(err);
    if (next) {
      next(err);
    }
  }
};

app.get('/activity', async (req, res, next) => {
  try {
    // console.log('GET /activity');
    // console.log(req.query);
    res.json(await Activity.find(req.query));
  } catch (err) {
    errorHandler(res, err, next);
  }
});

app.post('/activity', async (req, res, next) => {
  try {
    const activity = new Activity(req.body);

    res.json(await activity.save());
  } catch (err) {
    errorHandler(res, err, next);
  }
});

app.listen(3004, () => {
  console.log('Server listening on port 3004.');
});
