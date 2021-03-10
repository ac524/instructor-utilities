const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

/**
 * Type Definition Imports
 * @typedef {import('../FeedEntrySchema').FeedEntryDocument} FeedEntryDocument
 */

const FeedEntrySchema = require("../FeedEntrySchema");

const methods = require("./methods");

/**
 * @typedef {Object} FeedSchema
 * @property {string} room
 * @property {ObjectId} for
 * @property {string} in
 * @property {FeedEntryDocument[]} items
 * 
 * @typedef {import('mongoose').Document & FeedSchema} FeedDocument
 */
const FeedSchema = new Schema({
    room: {
      type: ObjectId,
      ref:'Classroom',
      required: true
    },
    for: {
        type: ObjectId,
        required: true
    },
    in: {
      type: String,
      required: true
    },
    items: [ FeedEntrySchema ]
});

FeedSchema.methods.pushItem = methods.pushItem;

module.exports = FeedSchema;