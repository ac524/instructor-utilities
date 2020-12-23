const ValidationSchema = require("../ValidationSchema");
const studentValidation = require("./studentValidation");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 */

/**
 * @typedef {Object} StudentData
 * @property {ObjectId} belongsTo
 * @property {string} name
 * @property {number} priorityLevel
 * @property {ObjectId} assignedTo
 */
const studentValidation = new ValidationSchema("student", {
    ...studentValidation.schema,
    belongsTo: { type: "objectID" }
});

module.exports = studentValidation;