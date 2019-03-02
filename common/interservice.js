const request = require('request');

// req: for getting headers
const getPromiseForRequest = async (req, url) =>
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
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            }
        })
    })
   

const getGroup = (req, groupId) => 
    getPromiseForRequest(req, `http://localhost:3001/groups/${groupId}`);

const getUser = req => 
    getPromiseForRequest(req, 'http://localhost:3000/users/me')

module.exports = {
    getGroup,
    getUser
}