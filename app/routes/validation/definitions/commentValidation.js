const ValidationSchema = require("../ValidationSchema");
const feedEntryValidation = require("./feedEntryValidation");

/**
 * @typedef {Object} CommentData
 * @property {string} comment
 */
const commentValidation = new ValidationSchema("comment", {
    ...feedEntryValidation.schema,
    comment: [
        { type: "string", empty: false },
        {
            type: "object",
            props: {
                blocks: "array",
                entityMap: "object"
            }
        },
    ]
});

module.exports = commentValidation;