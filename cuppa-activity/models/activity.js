const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * An Action: any mutation in the data. Each Service is responsible for notifying
 * the Activity Microservice about new actions.
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
  action: { 
    type: String, 
    enum: ['Created', 'Joined'],
    required: true 
  }  // JOINED, INVITE
});

module.exports = mongoose.model('Activity', activitySchema);
