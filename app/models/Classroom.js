const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  staff: [{
    type: Schema.Types.ObjectId,
    ref:'Classroom',
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Classroom", ClassroomSchema);