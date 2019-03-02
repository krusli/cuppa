const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    members: [Schema.Types.ObjectId],   // user IDs
    owner: Schema.Types.ObjectId,       // user IDs
    createdOn: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Group', groupSchema);