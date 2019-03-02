const User = require('./models/user');

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// security layer
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('./auth'); // configured
const jwtAuthenticator = passport.authenticate('jwt', { session: false });

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-auth', {useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'), err => console.log(err));

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(passport.initialize());

const JWT_SECRET = 'naisho';
// TODO use a better payload instead of just userID
// issuer, subject, audience, expiresIn, algorithm
// NOTE has to be kept light since it is sent every req
const getToken = user => {
    const payload = {
        id: user.id,
        issued: Date.now()
    };

    return jwt.sign(payload, JWT_SECRET);
};

const getUserPublic = user => {
    // don't send back passwordHash
    const { passwordHash, ...userPublic } = user._doc;
    return userPublic;
}

app.post('/users', async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(422).send({
            error: 'invalid_request',
            message: 'Invalid request.'
        })
        return;
    }

    // create a new user and save it
    console.log('Creating user');
    try {
        const user = await User.create({
            name,
            username,
            passwordHash: bcrypt.hashSync(password, 10)    // 10 salting rounds TODO const
        });

        const token = getToken(user);

        res.location(`/users/${user.username}`).send({ user: getUserPublic(user), token });
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).send({
                error: 'validation_error',
                message: err.message
            });
        }
    } 
});

app.post('/login', (req, res, next) => {
    // use passport.authenticate to generate custom middleware with Passport.js sugar
    const middleware = passport.authenticate('local', {session: false}, (err, user, info) => {
        // NOTE that we don't store the user in the session => don't need serialization
        if (err || !user) {
            console.log('/login: failed, bad request');
            console.log(err);
            res.status(400).send();
        }

        req.login(user, {session: false}, err => {
            if (err) {
                console.log('/login: internal status error');
                console.log(err);
                res.status(500).send();
            }

            // generate a JWT (signed by us)
            const token = getToken(user);
            res.json({ user: getUserPublic(user), token });
        })
    })

    middleware(req, res);   // call it (we don't need next though)
})

app.get('/users/:username', jwtAuthenticator, async (req, res) => {
    const user = await User.findOne({ username: req.params.username })

    if (!user) {
        res.status(404).send({
            error: 'not_found',
            message: 'Entity not found'
        })
        return;
    }

    // don't send back passwordHash
    const { passwordHash, ...userPublic } = user._doc;
    res.send(userPublic)
})

app.listen(3000, () => {
    console.log('Server listening on port 3000.')
})