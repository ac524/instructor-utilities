const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

const methods = require("./methods")

const FeedEntrySchema = require("../FeedEntrySchema");

/**
 * @typedef {Object} StudentSchema
 * @property {ObjectId} _id
 * @property {string} name
 * @property {Number} priorityLevel
 * @property {(ObjectId|null)} assignedTo
 * @property {ObjectId} feed
 * 
 * @property {*} getFeedAggregateData
 * @property {*} getAggregateKeysByAction
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
  },
  meta: {
    type: Map,
    default: {}
  },
  elevation: {
    type: Number,
    default: 0
  },
  recentComments: [ FeedEntrySchema ]
});

StudentSchema.methods.getAggregateKeysByAction = methods.getAggregateKeysByAction;

StudentSchema.methods.getFeedAggregateData = methods.getFeedAggregateData;

module.exports = StudentSchema;