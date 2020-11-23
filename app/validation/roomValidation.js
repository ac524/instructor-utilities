const ValidationSchema = require("./ValidationSchema");

const roomValidation = new ValidationSchema("student", {
    name: { type: "string", empty: false }
});

module.exports = roomValidation;