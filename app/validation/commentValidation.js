const ValidationSchema = require("./ValidationSchema");

const commentValidation = new ValidationSchema("comment", {
    comment: { type: "string", empty: false }
});

module.exports = commentValidation;