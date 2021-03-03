const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

const methods = require("./methods")

/**
 * @typedef {Object} StudentSchema
 * @property {ObjectId} _id
 * @property {string} name
 * @property {Number} priorityLevel
 * @property {(ObjectId|null)} assignedTo
 * @property {ObjectId} feed
 * 
 * @property {*} getFeedAggregateData
 * @property {*} getFeedAggregate
 * 
 * @typedef {import('mongoose').Document & StudentSchema} StudentDocument
 */
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
      type: ObjectId
  },
  feed: {
    type: ObjectId,
    ref: "Feed",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

StudentSchema.methods.getFeedAggregateData = methods.getFeedAggregateData;

StudentSchema.methods.getFeedAggregate = methods.getFeedAggregate;

module.exports = StudentSchema;