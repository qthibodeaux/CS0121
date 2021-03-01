require('dotenv').config()
const user = require('../db/models/user');

const expressJwt = require('express-jwt');
const jwtMiddleWare = expressJwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] } )

module.exports = function(app) {
    const users = require('./controller');

    app.post('/register', users.register);
    app.post('/login', users.login);
    app.get('/getall', jwtMiddleWare, users.getall);
}