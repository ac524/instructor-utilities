const Schema = require("mongoose").Schema;
const { ObjectId, Mixed } = Schema.Types;

/**
 * @typedef {Object} FeedEntrySchema
 * @property {string} action
 * @property {ObjectId} token
 * @property {(Object|null)} data
 * 
 * @typedef {import('mongoose').Document & FeedEntrySchema} FeedEntryDocument
 */
const FeedEntrySchema = new Schema({
  action: {
    type: String,
    required: true
  },
  by: {
      type: ObjectId,
      ref: "User",
      required: true
  },
  data: {
      type: Mixed
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = FeedEntrySchema;