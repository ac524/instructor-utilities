const mongoose = require("mongoose");

const TokenSchema = require("./schema/TokenSchema");

module.exports = mongoose.model( "Token", TokenSchema );