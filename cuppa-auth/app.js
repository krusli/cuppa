const User = require('./models/user');

const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
// const cors = require('cors');
const bodyParser = require('body-parser');

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-auth', {useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'), err => console.log(err));

const app = express();
app.use(helmet());
app.use(bodyParser.json());

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
            passwordHash: bcrypt.hashSync(password, 10)    // 10 salting rounds
        });

        // don't send back passwordHash
        const { passwordHash, ...userPublic } = user._doc;
        res.location(`/users/${user.username}`).send(userPublic);
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

app.get('/users/:username', async (req, res) => {
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