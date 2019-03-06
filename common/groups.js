const getPromiseForRequest = require('./utils').getPromiseForRequest;

const getGroup = (req, res, groupId) =>
  getPromiseForRequest(req, res, `http://localhost:3001/groups/${groupId}`);

const getGroups = (req, res) =>
  getPromiseForRequest(req, res, 'http://localhost:3001/groups');

const getMeetupsForGroup = (req, res, groupId) =>
  getPromiseForRequest(req, res, `http://localhost:3002/meetups?groupId=${groupId}`);

const joinGroup = async (req, res, groupId) => {
  const user = await getUserMe(req, res);
  return await getPromiseForRequest(req, res, `http://localhost:3001/groups/${groupId}/members`, 'POST', { username: user.username });
};

module.exports = {
  getGroup,
  getGroups,
  getMeetupsForGroup,
  joinGroup
};
