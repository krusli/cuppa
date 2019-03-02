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
                    // TODO: if JSON.parse fails, should NOT be internal server error but unauthorized
                    resolve(JSON.parse(body));
                } catch (error) {
                    res.status(401).send({
                        error: 'unauthorized',
                        message: 'You are not authorized to perform this action.'
                    })
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
    getPromiseForRequest(req, res, 'http://localhost:3000/users/me')

module.exports = {
    getGroup,
    getGroups,
    getUser,
    getUserMe
}
