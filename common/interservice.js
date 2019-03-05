const request = require('request');

// req: for getting headers
const getPromiseForRequest = async (req, res, url, method, body) => 
    new Promise((resolve, reject) => {

        if (!method) {
            method = 'GET';
        }

        // set up the request
        const options = {
            // url,
            headers: {
                authorization: req.headers.authorization
            }
        }

        if (body) {
            options.body = JSON.stringify(body);
            options.headers['content-type'] = 'application/json';
        }

        const callback = (error, response, body) => {
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
                        console.log('Not 200')
                        res.status(response.statusCode).send();
                        reject(body);
                    }

                } catch (error) {
                    console.log('Error')
                    reject(error);
                }
            }
        }

        // do the request
        if (method == 'GET') {
            request.get(url, options, callback);
        } else if (method == 'POST') {
            request.post(url, options, callback);
        }
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

// TODO untested
const joinGroup = async (req, res, groupId) => {
    const user = await getUserMe(req, res);
    return await getPromiseForRequest(req, res, `http://localhost:3001/groups/${groupId}/members`, 'POST', { username: user.username });
}

// const getMeetup = (req, res, meetupId) =>
//     getPromiseForRequest(req, res, 'http://localhost:3002/meetups/${meetupId}')

module.exports = {
    getGroup,
    getGroups,
    getUser,
    getUsers,
    getUserMe,
    getMeetupsForGroup,
    joinGroup
}
