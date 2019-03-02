const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, uniquee: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true }
});

userSchema.methods.validPassword = (user, password) =>
    bcrypt.compareSync(password, user.passwordHash);

module.exports = mongoose.model('User', userSchema);