const ValidationSchema = require("./ValidationSchema");

const appValidation = new ValidationSchema("invite", {
    type: { type: "string", empty: false },
    roomId: { type: "objectID" }
});

module.exports = appValidation;