const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentMethods = require("./methods/student");
const classroomMethods = require("./methods/classroom");

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
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priorityLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  assignedTo: {
      type: Schema.Types.ObjectId
  },
  feed: {
    type: Schema.Types.ObjectId,
    ref: "Feed",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

StudentSchema.methods.getFeedAggregateData = studentMethods.getFeedAggregateData;

StudentSchema.methods.getFeedAggregate = studentMethods.getFeedAggregate;

// Create Schema
const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  staff: [StaffSchema],
  students: [StudentSchema],
  invites: [InvitesSchema],
  code: String,
  apps: [{
    type: Schema.Types.ObjectId,
    ref:"App",
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

ClassroomSchema.methods.getFeedAggregate = classroomMethods.getFeedAggregate;

module.exports = mongoose.model("Classroom", ClassroomSchema);