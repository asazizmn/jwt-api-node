/*
 * server.js
 * - the main express based node application file
 * - will be used to setup dependencies
 * - and configure application, including the database
 * - and define basic routes, both protected and unprotected
 */


//
// setup dependencies
//

// popular node web backend framework
var express = require('express');
var app = express();

// parsing middleware
// allows you to parse incoming request bodies
var bodyParser = require('body-parser');

// allows to automatically log requests to console
var morgan = require('morgan');

// allows interaction with mongodb
// and object modelling for node
var mongoose = require('mongoose');

// node implementation of JSON Web Tokens
// allows us to create and then verify them
var jwt = require('jsonwebtoken');

// import global configuration properties
var config = require('./config');

// import the user model
var User = require('./app/models/user');


//
// configure application, including database
//

// set port to default value or to any environment value
// and also connect to the releveant db url
var port = process.env.PORT || 8080;
mongoose.connect(config.database);

// make jwt signature secret globally available
app.set('superSecret', config.secret);

// setup url-encoded and generic json parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// hindicate 'dev' when logging
app.use(morgan('dev'));


//
// setup routes
//

app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});


//
// start the server
//

app.listen(port);
console.log('listenting to port: ' + port);
