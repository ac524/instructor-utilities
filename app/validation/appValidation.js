const ValidationSchema = require("./ValidationSchema");

const appValidation = new ValidationSchema("app", {
    type: { type: "string", empty: false },
    roomId: { type: "objectID" }
});

module.exports = appValidation;