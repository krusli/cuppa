const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const request = require('request');

const Meetup = require('./models/meetup');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-meetups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));

app.get('/healthCheck', (req, res) => res.send());

// TODO refactor to single common file
// TODO refactor newRequest(url, req)
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

const getUser = async req => {
    const options = {
        url: 'http://localhost:3000/users/me',
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
    const name = req.body.name;
    const description = req.body.description;
    const groupId = req.body.group;

    if (!groupId || !name) {
        res.status(422).send({
            error: 'invalid_request',
            message: 'Invalid request.'
        });
        return;
    }

    // make sure user can access the group
    const group = await getGroup(req, groupId);
    const user = await getUser(req);
    if (!group) {
        res.status(401).send({
            error: 'unauthorized',
            message: 'You are not authorized to perform this action.'
        })
        return;
    }

    // create the meetup
    const meetup = new Meetup({
        name,
        description,
        group: groupId,
        attendees: [],
        owner: user._id
    });

    res.json(meetup);
})

app.listen(3002, () => {
    console.log('Server listening on port 3002.')
})