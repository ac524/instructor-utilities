const ValidationSchema = require("../ValidationSchema");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 */

/**
 * @typedef {Object} StudentData
 * @property {string} name
 * @property {number} priorityLevel
 * @property {ObjectId} assignedTo
 */
const studentValidation = new ValidationSchema("student", {
    name: { type: "string", empty: false },
    priorityLevel: { type: "number", min: 1, max: 10 },
    assignedTo: { type: "objectID", nullable: true }
});

module.exports = studentValidation;