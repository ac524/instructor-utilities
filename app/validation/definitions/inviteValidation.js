const ValidationSchema = require("../ValidationSchema");

/**
 * @typedef {Object} InviteData
 * @property {string} email
 */
const inviteValidation = new ValidationSchema("invite", {
    email: { type: "email" }
});

module.exports = inviteValidation;