const getPromiseForRequest = require('./utils').getPromiseForRequest;

// const getGroup = (req, res, groupId) =>
//   getPromiseForRequest(req, res, `http://localhost:3001/groups/${groupId}`);

module.exports = {
  getActivityForGroup(req, res, groupId) {
    return getPromiseForRequest(req, res, `http://localhost:3004/activity?subjectType=Group&subject=${groupId}`)
  },

  newActivity(req, res, activity) {
    return getPromiseForRequest(req, res, `http://localhost:3004/activity`, 'POST', activity);
  }
}
