/**
 * api.js
 * - contains all the api routes
 */


// prepare router middleware
var express = require('express');
var router = express.Router();

var User = require('./../models/user');


// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
// TODO: route middleware to verify a token

// '/api' route
router.get('/', function (req, res) {
    res.json({
        message: "Welcome to the API!"
    });
});


// '/api/users' - return all users
router.get('/users', function (req, res) {
    User.find(function (err, users) {
        res.json(users);
    });
});


module.exports = router;