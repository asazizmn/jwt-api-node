/*
 * user.js
 * - User model based on Mongoose
 * - will be used when creating and getting users
 */


// requirements & dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create user model and package it for later use
model.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));