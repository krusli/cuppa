const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const request = require('request');

// const Group = require('./models/group');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-meetups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));

app.get('/healthCheck', (req, res) => res.send());

app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})