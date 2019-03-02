const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = require('./schemas/role');

const roleAndUsersSchema = new Schema({
    role: Schema.Types.ObjectId,      // roleId (either in Base, Group or Meetup -> need to search all 3)
    user: [ Schema.Types.ObjectId ],  // userId[]
    // TODO strategy: [ ENROLLMENT | VOTING ] (assumed by default)
});

// TODO TeamTemplate
// TODO EventTemplate

const teamSchema = new Schema({
    name: { type: String, required: true },
    rolesAndUsers: { type: [ roleAndUsersSchema ], default: [] },
});

const eventSchema = new Schema({
    name: { type: String, required: true },    
    requiredRoles: { type: [Schema.Types.ObjectId], default: [] },
    dateStart: { type: Date, required: true }
});

const meetupSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    attendees: [Schema.Types.ObjectId],   // user IDs
    owner: { type: Schema.Types.ObjectId, required: true },       // user IDs
    createdOn: { type: Date, default: Date.now },
    group: Schema.Types.ObjectId,    // group ID

    events: { type: [eventSchema], default: [] },
    teams: { type: [teamSchema], default: [] },

    roles: { type: [roleSchema], default: [] }    // roles specific to *only* this meetup
});

module.exports = mongoose.model('Meetup', meetupSchema);
