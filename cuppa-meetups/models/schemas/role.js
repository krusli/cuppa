const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO don't copy paste, refactor to a common dir + install mongoose (dependency)

const roleSchema = new Schema({
  name: { type: String, required: true }
  // requiredType: String,   // USER or SERVICE
  // roleWidget: String, // TODO
});


module.exports = roleSchema;
