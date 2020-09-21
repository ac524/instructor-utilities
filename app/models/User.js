const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  classrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Classroom"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);