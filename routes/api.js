/**
 * api.js
 * - contains all the api routes '/api/...'
 */


//
// dependencies
//

var express = require('express');
var router = express.Router();
var User = require('./../models/user');
var app = require('../app');
var jwt = require('jsonwebtoken');


//
// routing
//

// UNPROTECTED: POST route to authenticate a user
router.post('/authenticate', function (req, res) {

    // username
    var conditions = {
        name: req.body.name
    };

    // function to execute once username is found
    var callback = function (err, user) {
        var token, expire = {
            expiresIn: 60 * 60 * 24
        };

        if (err) throw err;

        // authenticate username and password
        if (user) {
            if (req.body.password === user.password) {

                // create token
                token = jwt.sign(user, app.get('signatureKey'), expire);

                // and return it
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                })

            } else {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        }
    };


    // use mongoose to find existing user and return token
    User.findOne(conditions, callback);
});


// route middleware to verify token for routes below
// the secret used here must match the one when creating the token
// otherwise send 403 forbidden HTTP response code
router.use(function (req, res, next) {

    // although recommended way of sending token is within http header
    // for flexibility, check all possible locations for token (GET, POST, & HTTP header)
    var token = req.query.token || req.body.token || req.headers['x-access-token'];

    // function to decides what to do in terms of failure or success in token verification
    var callback = function (err, decoded) {
        
        // failure
        if (err) {
            return res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });

        // success
        } else {

            // pass the decoded information to the protected routes below
            // remember that jwt's contain information in payload claims i.e. registered, public, private
            // information like token expiry date, username, etc
            req.decoded = decoded;
            next();
        }
    };


    // ensure token provided, then verify it
    if (token) {
        jwt.verify(token, app.get('signatureKey'), callback);

    // in absence of token return error
    } else {
        return res.status(403).send({
            success: false,
            message: 'Unauthorised access. No token provided.'
        });
    }
});


// PROTECTED: default
router.get('/', function (req, res) {
    res.json({
        message: "Welcome to the API!"
    });
});


// PROTECTED: return all users
router.get('/users', function (req, res) {
    User.find(function (err, users) {
        res.json(users);
    });
});


module.exports = router;