const Schema = require("mongoose").Schema;

const appTypeRegistry = require("../../../../config/apps/registry.json");

/**
 * @typedef {Object} AppTypeSchema
 * @property {String} type
 * @property {Boolean} isDisabled
 * 
 * @typedef {import('mongoose').Document & AppTypeSchema} AppTypeDocument
 */
const AppTypeSchema = new Schema({
    type: {
      type: String,
      required: true
    },
    // name: {
    //   type: String,
    //   required: true
    // },
    isDisabled: {
      type: Boolean,
      default: false
    }
}, { toJSON: { virtuals: true } });

AppTypeSchema.virtual('name').get(function() {

  return appTypeRegistry[this.type].name;

});

AppTypeSchema.virtual('fields').get(function() {

  return {
    student: [],
    ...(appTypeRegistry[this.type].fields || {})
  };

});

module.exports = AppTypeSchema;