const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priorityLevel: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  classroom: {
      type: Schema.Types.ObjectId,
      ref:'Classroom',
      required: true
  },
  assignedTo: {
      type: Schema.Types.ObjectId,
      ref:'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Student", StudentSchema);