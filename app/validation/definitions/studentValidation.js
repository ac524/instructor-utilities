const ValidationSchema = require("../ValidationSchema");

const studentValidation = new ValidationSchema("student", {
    name: { type: "string", empty: false },
    priorityLevel: { type: "number", min: 1, max: 10 },
    assignedTo: { type: "objectID", nullable: true }
});

module.exports = studentValidation;