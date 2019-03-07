const request = require('request');

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
            // TODO don't depend on res
            console.log('Not 200')
            res.status(response.statusCode).send();
            reject(body);
          }

        } catch (error) {
          console.log('Error');
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
  });

module.exports = {
  getPromiseForRequest
};
