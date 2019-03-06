const getPromiseForRequest = require('./utils').getPromiseForRequest;

const getGroup = (req, res, groupId) =>
  getPromiseForRequest(req, res, `http://localhost:3001/groups/${groupId}`);

const getGroups = (req, res) =>
  getPromiseForRequest(req, res, 'http://localhost:3001/groups');

const getGroupsMe = (req, res) =>
  getPromiseForRequest(req, res, 'http://localhost:3001/me/groups');

const getMeetupsForGroup = (req, res, groupId) =>
  getPromiseForRequest(req, res, `http://localhost:3002/meetups?groupId=${groupId}`);

const joinGroup = async (req, res, groupId) => {
  const user = await getUserMe(req, res);

  // wait for the result, then return it
  return await getPromiseForRequest(req, res, 
                                    `http://localhost:3001/groups/${groupId}/members`, 
                                    'POST', 
                                    { username: user.username });
};

module.exports = {
  getGroup,
  getGroups,
  getGroupsMe,
  // TODO move meetups to meetups.js
  getMeetupsForGroup,
  joinGroup
};
