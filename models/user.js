/**
 * user.js
 * - User model based on Mongoose
 * - will be used when creating and getting users
 */


// requirements & dependencies
var mongoose = require('mongoose');


// define user schema
var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
});

// create user model and package it for later use
module.exports = mongoose.model('User', UserSchema);