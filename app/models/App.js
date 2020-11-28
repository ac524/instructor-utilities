const mongoose = require("mongoose");

// Create Schema
const AppSchema = require("./schema/AppSchema");

module.exports = mongoose.model("App", AppSchema);