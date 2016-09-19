/**
 * app.js
 * - the main express based node application file
 * - will be used to setup dependencies
 * - and configure the application, including the database and routes
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
var logger = require('morgan');

// allows interaction with mongodb
// and object modelling for node
var mongoose = require('mongoose');

// import global configuration properties
var config = require('./config');


//
// configure application, including database
//

mongoose.connect(config.database);

app.set('port', process.env.PORT || 8080);
app.set('signatureKey', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// please note this has to happen before routes setup
module.exports = app;

app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));


//
// start listening to the port
//

app.listen(app.get('port'));
console.log('listenting to port: ' + app.get('port'));