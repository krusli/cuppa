const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = require('./schemas/role');

const roleAndUsersSchema = new Schema({
    role: Schema.Types.ObjectId,      // roleId (either in Base, Group or Meetup -> need to search all 3)
    user: [ Schema.Types.ObjectId ],  // userId[]
    // TODO strategy: [ Enrol ] (assumed by default)
        // voting is for later
    // under poll status, show poll widget
    // the actual user set is still null at that point -> admin sets it
});

const teamSchema = new Schema({
    name: { type: String, required: true },
    rolesAndUsers: { type: [ roleAndUsersSchema ], default: [] },
});

const eventSchema = new Schema({
    requiredRoles: { type: [ Schema.Types.ObjectId ], defualt: [] },
    timeStart: { type: Date, required: true }
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

module.exports = mongoose.model('Group', meetupSchema);
