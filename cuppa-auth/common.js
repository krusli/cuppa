const jwt = require('jsonwebtoken');

const JWT_SECRET = require('./consts').JWT_SECRET;
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

module.exports = {
    getToken,
    getUserPublic
}