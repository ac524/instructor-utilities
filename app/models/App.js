const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AppSchema = new Schema({
  room: {
      type: Schema.Types.ObjectId,
      ref:'Classroom',
      required: true
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  data: {
    type: Schema.Types.Mixed
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("App", AppSchema);