const ValidationSchema = require("./ValidationSchema");

const loginValidation = new ValidationSchema("login", {
    email: { type: "email" },
    password: { type: "string", empty: false }
});

module.exports = loginValidation;