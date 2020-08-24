const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClassroomMemberSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  user: {
      type: Schema.Types.ObjectId,
      ref:'User'
  },
  classroom: {
      type: Schema.Types.ObjectId,
      ref:'Classroom'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ClassroomMember", ClassroomMemberSchema);