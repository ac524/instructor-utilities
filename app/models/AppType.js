const mongoose = require("mongoose");

// Create Schema
const AppTypeSchema = require("./schema/AppTypeSchema");

module.exports = mongoose.model( "AppType", AppTypeSchema );