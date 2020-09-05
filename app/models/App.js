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
    type: Schema.Types.ObjectId,
    ref:'AppType',
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

AppSchema.index({ room: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("App", AppSchema);