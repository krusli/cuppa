const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * An Action: any mutation in the data. Each Service is responsible for notifying
 * the Activity Microservice about new actions.
 * 
 * Rule of thumb: any request that mutates state (i.e. POST/PUT/DELETE) will likely
 * be "notable" and should probably be recorded as an Activity.
 * e.g. creating a Group/joining a Group/leaving a Group
 * 
 * An Activity is represented in the passive voice
 * (Subject was Action-ed by the User)
 * 
 * Illustrative example:
 * （１）　ポリッジが誰かに食べられた！
 * - The porridge was eaten by somebody!
 */
const activitySchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true },
  // group: mongoose.Types.ObjectId,
  subject: { type: mongoose.Types.ObjectId, required: true }, // other user/group/meetup
  subjectType: { 
    type: String, 
    enum: ['User', 'Group', 'Meetup'],  // TODO Team, Role, Event (part of Timeline)
    required: true 
  },  // USER, GROUP, MEETUP

  // TODO define check
  // base subject should be in .subject
  // any more subjects (hierarchical) should be in subSubjects
  // e.g. Group -> Meetup
  subSubjects: { type: [String], required: true, default: [] }, // NOTE can't support ObjectId for some reason?
  subSubjectTypes: {
    type: [String],
    required: true, 
    default: []
  },


  action: { 
    type: String, 
    enum: ['Created', 'Joined', 'Left'],
    required: true 
  },  // JOINED, INVITE
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
