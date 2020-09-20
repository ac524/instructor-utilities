const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvitesSchema = new Schema({
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
const StaffSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  user: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true
  },
  date: {
    type: Date,
    default: Date.now
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
  staff: [StaffSchema],
  students: [{
    type: Schema.Types.ObjectId,
    ref:"Student",
  }],
  invites: [InvitesSchema],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Classroom", ClassroomSchema);