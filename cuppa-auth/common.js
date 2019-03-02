const getUserPublic = user => {
    // don't send back passwordHash
    const { passwordHash, ...userPublic } = user._doc;
    return userPublic;
}

module.exports = {
    getUserPublic
}