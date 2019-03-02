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

const getGroup = async (req, groupId) => {
    const options = {
        url: `http://localhost:3001/groups/${groupId}`,
        headers: {
            authorization: req.headers.authorization
        }
    }

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            }
        })
    })
}

app.post('/meetups', async (req, res, next) => {
    const groupId = req.body.group;
    if (!groupId) {
        res.status(422).send({
            error: 'invalid_request',
            message: 'Invalid request.'
        });
        return;
    }

    // get the group first (only will return a group if user is a member there)
    const group = await getGroup(req, groupId);
    res.json(group);
})

app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})