const ValidationSchema = require("../ValidationSchema");
const feedEntryValidation = require("./feedEntryValidation");

/**
 * @typedef {Object} CommentData
 * @property {string} comment
 */
const commentValidation = new ValidationSchema("comment", {
    ...feedEntryValidation.schema,
    comment: { type: "string", empty: false }
});

module.exports = commentValidation;