const ValidationSchema = require("./ValidationSchema");

const inviteValidation = new ValidationSchema("login", {
    email: { type: "email" }
});

module.exports = inviteValidation;