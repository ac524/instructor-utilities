const ValidationSchema = require("../ValidationSchema");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 */

/**
 * @typedef {Object} AppData
 * @property {type} type
 * @property {ObjectId} roomId
 */
const appValidation = new ValidationSchema("app", {
    type: { type: "string", empty: false },
    roomId: { type: "objectID" }
});

module.exports = appValidation;