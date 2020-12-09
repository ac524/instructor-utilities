const ValidationSchema = require("../ValidationSchema");

/**
 * @typedef {Object} LoginData
 * @property {string} email
 * @property {string} password
 */
const loginValidation = new ValidationSchema("login", {
    email: { type: "email" },
    password: { type: "string", empty: false }
});

module.exports = loginValidation;