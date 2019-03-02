const getToken = require('./common').getToken;
const getUserPublic = require('./common').getUserPublic;
const bcrypt = require('bcrypt');

// configured Passport.js obj
const passport = require('./auth');

module.exports = Model => {
    return {
        newUser: async (req, res) => {
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
                const user = await Model.create({
                    name,
                    username,
                    passwordHash: bcrypt.hashSync(password, 10)    // 10 salting rounds TODO const
                });

                const token = getToken(user);

                res.location(`/users/${user.username}`).send({ user: getUserPublic(user), token });
            }
            catch (err) {
                console.error(err);
                if (err.name === 'ValidationError') {
                    res.status(422).send({
                        error: 'validation_error',
                        message: err.message
                    });
                } 
                else if (err.name == 'MongoError') {
                    res.status(422).send({
                        error: 'validation_error',
                        message: err.message
                    });
                }
                else {
                    res.status(500).send({
                        error: 'internal_error',
                        message: err.message
                    })
                }
            }
        },

        login: (req, res, next) => {
            // use passport.authenticate to generate custom middleware with Passport.js sugar
            const middleware = passport.authenticate('local', { session: false }, (err, user, info) => {
                // NOTE that we don't store the user in the session => don't need serialization
                if (err || !user) {
                    console.log('/login: failed, bad request');
                    console.log(err);
                    res.status(400).send();
                }

                req.login(user, { session: false }, err => {
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
        },

        getUser: async (req, res) => {
            const user = await Model.findOne({ username: req.params.username })

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
        }
    }
}