const ValidationSchema = require("../ValidationSchema");

/**
 * @typedef {Object} ResendData
 * @property {string} email
 */
const resendValidation = new ValidationSchema("resend", {
    email: { type: "email" }
});

module.exports = resendValidation;