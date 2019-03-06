const getPromiseForRequest = require('./utils').getPromiseForRequest;

const getUser = (req, res, username) =>
  getPromiseForRequest(req, res, `http://localhost:3000/users/${username}`);

const getUserMe = (req, res) =>
  getPromiseForRequest(req, res, 'http://localhost:3000/users/me');

const getUsers = (req, res, userIds) => {
  const queryString = userIds.map(x => `_id=${x}`).join('&');
  return getPromiseForRequest(req, res, `http://localhost:3000/users?${queryString}`);
}
