const ValidationSchema = require("../ValidationSchema");

const userValidation = new ValidationSchema("user", {
    name: { type: "string", min: 3 },
    email: "email",
    password: { type: "string", min: 6, max: 30  }
});

module.exports = userValidation;