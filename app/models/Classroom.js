const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Invites = new Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: Schema.Types.ObjectId,
    ref:"Token",
  }
});

// Create Schema
const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  apps: [{
      type: Schema.Types.ObjectId,
      ref:"App",
  }],
  staff: [{
    type: Schema.Types.ObjectId,
    ref:"Staff",
  }],
  students: [{
    type: Schema.Types.ObjectId,
    ref:"Student",
  }],
  invites: [Invites],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Classroom", ClassroomSchema);