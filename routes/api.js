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

// default
router.get('/', function (req, res) {
    res.json({
        message: "Welcome to the API!"
    });
});


// return all users
router.get('/users', function (req, res) {
    User.find(function (err, users) {
        res.json(users);
    });
});


// TODO: route middleware to verify a token

// POST route to authenticate a user
router.post('/authenticate', function (req, res) {

    var conditions = {
        name: req.body.name
    };

    var callback = function (err, user) {
        var token, expire = {
            expiresIn: 60*60*24
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



module.exports = router;