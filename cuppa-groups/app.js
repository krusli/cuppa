const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const request = require('request');

const Group = require('./models/group');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-groups', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'), err => console.log(err));


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

app.post('/groups', async (req, res, next) => {
    // validate request
    const name = req.body.name;
    const description = req.body.description;

    if (!name) {
        res.status(422).send({
            error: 'invalid_request',
            message: 'Invalid request.'
        });
        return;
    }

    try {
        const user = await getUser(req);

        const owner = user._id;
        const group = await Group.create({
            name,
            description,
            members: [owner],
            owner
        })

        res.json(group);
    } catch (err) {
        next(err);
    }
})

app.get('/groups', async (req, res, next) => {
    try {
        const user = await getUser(req);
        const groups = await Group.find({ members: user._id })    // contains userID
        res.json(groups);
    } catch(err) {
        next(err);
    }
    
})

app.listen(3001, () => {
    console.log('Server listening on port 3001.')
})