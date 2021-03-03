const Schema = require("mongoose").Schema;
const { ObjectId, Mixed } = Schema.Types;

/**
 * @typedef {Object} AppSchema
 * @property {ObjectId} room
 * @property {ObjectId} type
 * @property {String} name
 * @property {Object} data
 * @property {Date} date
 * 
 * @typedef {import('mongoose').Document & AppSchema} AppDocument
 */
const AppSchema = new Schema({
    room: {
        type: ObjectId,
        ref:'Classroom',
        required: true
    },
    type: {
      type: ObjectId,
      ref:'AppType',
      required: true
    },
    name: {
      type: String,
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
  
AppSchema.index({ room: 1, type: 1 }, { unique: true });

module.exports = AppSchema;