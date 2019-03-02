const User = require('./models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const passportJwt = require('passport-jwt');
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

// setup passport
// for use with browsers + cookies
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         let user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username })
            .then(user => {
                if (!user) {
                    done(null, false);
                    return;
                }

                if (!user.validPassword(user, password)) {
                    done(null, false);
                    return;
                }

                // valid user-password pair, log the user in
                user.lastLogin = new Date();  // update last login
                user.save();  // (runs in background)

                done(null, user);
            })
            .catch(done);
    }
))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'naisho'   // TODO const
}, async (jwtPayload, next) => {
    // find the user in DB if needed
    try {
        const user = await User.findById(jwtPayload);
        next(null, user);
    } catch (err) {
        next(err);
    }
}));

module.exports = passport;