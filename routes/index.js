/**
 * index.js
 * - contains all the default routes
 * - outside of the api
 */


// prepare router middleware
var express = require('express');
var router = express.Router();
var app = require('../app');


// default route
router.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + app.get('port') + '/api');
});

// route to create user
router.get('/setup', function (req, res) {

    // create user using mongoose model
    // note that in reality the password would never be stored like this
    // it would have to be hashed
    var user = new User({
        name: "Zaid Uthman",
        password: "foo",
        admin: true
    });

    // save the user
    user.save(function (err) {
        if (err) {
            throw err;
        }

        console.log('user saved successfully');
        res.json({
            success: true
        });
    });
});


module.exports = router;