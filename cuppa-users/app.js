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

function createConnection(dbURL, options) {
    var db = mongoose.createConnection(dbURL, options);

    db.on('error', function (err) {
        // If first connect fails because mongod is down, try again later.
        // This is only needed for first connect, not for runtime reconnects.
        // See: https://github.com/Automattic/mongoose/issues/5169
        if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
            console.log(new Date(), String(err));

            // Wait for a bit, then try to connect again
            setTimeout(function () {
                console.log("Retrying first connect...");
                db.openUri(dbURL).catch(() => { });
                // Why the empty catch?
                // Well, errors thrown by db.open() will also be passed to .on('error'),
                // so we can handle them there, no need to log anything in the catch here.
                // But we still need this empty catch to avoid unhandled rejections.
            }, 20 * 1000);
        } else {
            // Some other error occurred.  Log it.
            console.error(new Date(), String(err));
        }
    });

    db.once('open', function () {
        console.log("Connection to db established.");
    });

    return db;
}

// Use it like
var db = createConnection('mongodb://mongo:27017/cuppa-users', { useNewUrlParser: true });

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
