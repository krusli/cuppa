const request = require('request');

const getGroup = async (req, groupId) => {
    const options = {
        url: `http://localhost:3001/groups/${groupId}`,
        headers: {
            authorization: req.headers.authorization
        }
    }

    return new Promise((resolve, reject) => {
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
}

const getUser = async req => {
    const options = {
        url: 'http://localhost:3000/users/me',
        headers: {
            authorization: req.headers.authorization
        }
    }

    return new Promise((resolve, reject) => {
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
}

module.exports = {
    getGroup,
    getUser
}