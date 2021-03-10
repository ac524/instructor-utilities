const mongoose = require("mongoose");

// Create Schema
const UserSchema = require("./schema/UserSchema");

module.exports = mongoose.model( "User", UserSchema );