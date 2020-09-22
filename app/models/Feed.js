const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedItem = new Schema({
    type: {
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

// Create Schema
const FeedSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref:'Classroom',
    required: true
  },
  for: {
      type: Schema.Types.ObjectId,
      required: true
  },
  in: {
    type: String,
    required: true
  },
  items: [ FeedItem ]
});

module.exports = mongoose.model("Feed", FeedSchema);