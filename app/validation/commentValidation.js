const ValidationSchema = require("./ValidationSchema");

const commentValidation = new ValidationSchema("invite", {
    comment: { type: "string", empty: false }
});

module.exports = commentValidation;