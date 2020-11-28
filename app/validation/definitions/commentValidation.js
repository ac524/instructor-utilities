const ValidationSchema = require("../ValidationSchema");

/**
 * @typedef {Object} CommentData
 * @property {string} comment
 */
const commentValidation = new ValidationSchema("comment", {
    comment: { type: "string", empty: false }
});

module.exports = commentValidation;