const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO Role as an object

const roleAndUserSchema = new Schema({
    role: { type: String, required: true },
    user: Schema.Types.ObjectId,
    // TODO strategy: [Poll, Provided]
});

// TODO
const surveySchema = new Schema({
    options: [String],
    // votes: []    // TODO
});

const teamSchema = new Schema({
    requiredRoles: [String],
    roleAndUsers: [roleAndUserSchema],
    surveys: [surveySchema]
})

const eventSchema = new Schema({
    requiredRoles: [String],
    timeStart: { type: Date, required: true }
})

const meetupSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    attendees: [Schema.Types.ObjectId],   // user IDs
    owner: { type: Schema.Types.ObjectId, required: true },       // user IDs
    createdOn: { type: Date, default: Date.now },
    group: Schema.Types.ObjectId,    // group ID

    teams: { type: [teamSchema], default: [] },
    events: { type: [eventSchema], default: [] }
})

module.exports = mongoose.model('Group', meetupSchema);