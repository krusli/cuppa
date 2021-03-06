const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// setup service discovery
// require('./consul');

// security layer
const cors = require('cors');
const passport = require('./auth').passport; // pre-configured
const jwtAuthenticator = passport.authenticate('jwt', { session: false });

// mongoose
const mongoose = require('mongoose');
const setupConnection = () => {
    mongoose.connect('mongodb://mongo:27017/cuppa-users', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'),
            err => {
                console.error(err);
                setTimeout(() => setupConnection(), 1000);  // wait 1s, reconnect
            });
};
setupConnection();

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

const User = require('./models/user');
const controllers = require('./controllers')(User);

app.get('/health-check', (req, res) => res.send());

// signup and login
app.post('/users', controllers.newUser);
app.post('/login', controllers.login);  // get a token too

// users
app.get('/users/me', jwtAuthenticator, controllers.getMe);
app.get('/users', jwtAuthenticator, controllers.getUsers);
app.get('/users/:username', jwtAuthenticator, controllers.getUserMe); // TODO disallow users with restricted keywors ['me']

// checks token validity
// sends 200 if valid
// 401 unauthorized if not (via middleware)
app.get('/validation', jwtAuthenticator, 
    (req, res) => res.send()
);

app.listen(3000, () => {
    console.log('Server listening on port 3000.')
})
