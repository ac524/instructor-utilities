const ValidationSchema = require("../ValidationSchema");

/**
 * @typedef {Object} RoomData
 * @property {string} name
 */
const roomValidation = new ValidationSchema("room", {
    name: { type: "string", empty: false }
});

module.exports = roomValidation;