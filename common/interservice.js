const request = require('request');

// req: for getting headers
const getPromiseForRequest = async (req, res, url) =>
    new Promise((resolve, reject) => {
        // set up teh request
        const options = {
            url,
            headers: {
                authorization: req.headers.authorization
            }
        }

        // do the request
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            }
            else {
                try {
                    // console.log(body);
                    // TODO: if JSON.parse fails, should NOT be internal server error but unauthorized
                    if (response.statusCode === 200) {
                        resolve(JSON.parse(body));
                    } else {
                        res.status(response.statusCode).send();
                        reject(response);
                    }

                } catch (error) {
                    reject(error);
                }
            }
        })
    })
   

const getGroup = (req, res, groupId) => 
    getPromiseForRequest(req, res, `http://localhost:3001/groups/${groupId}`);

const getGroups = (req, res) =>
    getPromiseForRequest(req, res, 'http://localhost:3001/groups');

const getUser = (req, res, username) => 
    getPromiseForRequest(req, res, `http://localhost:3000/users/${username}`);

const getUserMe = (req, res) => 
    getPromiseForRequest(req, res, 'http://localhost:3000/users/me');

const getUsers = (req, res, userIds) => {
    const queryString = userIds.map(x => `_id=${x}`).join('&');
    return getPromiseForRequest(req, res, `http://localhost:3000/users?${queryString}`);
}

const getMeetupsForGroup = (req, res, groupId) =>
    getPromiseForRequest(req, res, `http://localhost:3002/meetups?groupId=${groupId}`);

// const getMeetup = (req, res, meetupId) =>
//     getPromiseForRequest(req, res, 'http://localhost:3002/meetups/${meetupId}')

module.exports = {
    getGroup,
    getGroups,
    getUser,
    getUsers,
    getUserMe,
    getMeetupsForGroup
}
