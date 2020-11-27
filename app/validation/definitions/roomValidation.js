const ValidationSchema = require("./ValidationSchema");

const roomValidation = new ValidationSchema("room", {
    name: { type: "string", empty: false }
});

module.exports = roomValidation;