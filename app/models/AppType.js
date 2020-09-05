const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppTypes = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("AppType", AppTypes);