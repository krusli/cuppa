const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const User = require('../models/user');
const controllers = require('../controllers')(User);

describe('Controllers', () => {
    describe('newUser', () => {
        it('should send back an error if body is empty', () => {
            // const stub = sinon.stub(User, 'find')

            let _code;
            const mockRes = {
                status: code => {
                    _code = code;
                    return mockRes;
                },
                send: body => {
                    expect(_code).to.equal(400);
                    expect(body.error).to.equal('bad_request');
                }
            }

            const mockReq = {
                body: {}
            }

            controllers.newUser(mockReq, mockRes);
        })

        it('should create a user if all info provided', () => {
            const username = 'krusli';
            const password = 'hunter2';
            const name = 'Kenneth';

            const stub = sinon.stub(User, 'create').returns(
                new Promise((resolve, reject) => 
                    resolve(new User({ username: username, name: name, passwordHash: '' }))
                )
            );

            let _code, _location;
            const mockRes = {
                status: code => {
                    _code = code;
                    return mockRes;
                },
                location: location => {
                    _location = location;
                    return mockRes;
                },
                send: body => {
                    expect(_code).to.equal(201);
                    expect(_location).to.equal(`/users/${username}`);
                    expect(body.token).to.be.a('string');
                    expect(body.user.name).to.equal(name);
                    expect(body.user.username).to.equal(username);
                }
            }

            const mockReq = {
                body: {
                    username,
                    password,
                    name
                }
            }

            controllers.newUser(mockReq, mockRes);
            stub.restore();
        })

        // it('should send back an error if a user with the same username exists', () => {
        // })


    })
})