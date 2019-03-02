const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// security layer
const passport = require('./auth'); // pre-configured
const jwtAuthenticator = passport.authenticate('jwt', { session: false });

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cuppa-auth', {useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'), err => console.log(err));

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(passport.initialize());

// TODO use a better payload instead of just userID
// issuer, subject, audience, expiresIn, algorithm
// NOTE has to be kept light since it is sent every req

const User = require('./models/user');
const controllers = require('./controllers')(User);

// new user
app.post('/users', controllers.newUser);

// get a token
app.post('/login', controllers.login)

// example protected route
app.get('/users/:username', jwtAuthenticator, controllers.getUser)

// sends 200 if valid
// 401 unauthorized if not (via middleware)
app.get('/validation', jwtAuthenticator, 
    (req, res) => res.send()
);

app.listen(3000, () => {
    console.log('Server listening on port 3000.')
})