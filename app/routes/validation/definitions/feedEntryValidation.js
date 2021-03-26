const ValidationSchema = require("../ValidationSchema");

/**
 * @typedef {Object} CommentData
 * @property {string} comment
 */
const commentValidation = new ValidationSchema("feedEntry", {
    feedId: { type: "objectID" }
});

module.exports = commentValidation;