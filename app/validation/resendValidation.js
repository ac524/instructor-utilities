const ValidationSchema = require("./ValidationSchema");

const resendValidation = new ValidationSchema("resend", {
    type: { type: "email" }
});

module.exports = resendValidation;