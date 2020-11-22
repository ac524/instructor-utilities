const ValidationSchema = require("./ValidationSchema");

const inviteValidation = new ValidationSchema("invite", {
    email: { type: "email" }
});

module.exports = inviteValidation;