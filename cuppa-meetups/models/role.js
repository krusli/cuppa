const mongoose = require('mongoose');
const roleSchema = require('./schemas/role');

module.exports = mongoose.model('Role', roleSchema);
