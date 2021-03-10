const mongoose = require("mongoose");

const FeedSchema = require("./schema/FeedSchema");

module.exports = mongoose.model( "Feed", FeedSchema );