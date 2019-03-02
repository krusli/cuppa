const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = require('./schemas/role');


const groupSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    members: [Schema.Types.ObjectId],   // user IDs
    owner: { type: Schema.Types.ObjectId, required: true },       // user IDs
    createdOn: { type: Date, default: Date.now },
    roles: { type: [ roleSchema ], default: [] }    // roles specific to *only* this group
});

module.exports = mongoose.model('Group', groupSchema);
