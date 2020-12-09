const userValidation = require("./userValidation");
const ValidationSchema = require("../ValidationSchema");

/**
 * @typedef {Object} RegistrationData
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} roomname
 * @property {string} code
 */
const registerValidation = new ValidationSchema("registration", {
    ...userValidation.schema,
    roomname: { type: "string", min: 3 },
    code: { type: "string", empty: false }
});

module.exports = registerValidation;