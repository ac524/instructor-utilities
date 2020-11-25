const userValidation = require("./userValidation");
const ValidationSchema = require("./ValidationSchema");

const registerValidation = new ValidationSchema("registration", {
    ...userValidation.schema,
    roomname: { type: "string", min: 3 },
    code: { type: "string", empty: false }
});

module.exports = registerValidation;