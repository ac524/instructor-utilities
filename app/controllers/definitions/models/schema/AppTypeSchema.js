const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

/**
 * @typedef {Object} AppTypeSchema
 * @property {string} email
 * @property {ObjectId} token
 * 
 * @typedef {import('mongoose').Document & AppTypeSchema} AppTypeDocument
 */
const AppTypeSchema = new Schema({
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
});

module.exports = AppTypeSchema;