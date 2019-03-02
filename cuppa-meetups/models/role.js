const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: { type: String, required: true }
  // requiredType: String,   // USER or SERVICE
  // roleWidget: String, // TODO
});

module.exports = mongoose.model('Role', roleSchema);
