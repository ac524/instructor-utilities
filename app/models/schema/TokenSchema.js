const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

/**
 * @typedef {Object} TokenSchema
 * @property {ObjectId} relation
 * @property {string} token
 * 
 * @typedef {import('mongoose').Document & TokenSchema} TokenDocument
 */

const TokenSchema = new Schema({
    relation: {
        type: ObjectId,
        required: true
    },
    token: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        // Expire in 3 days
        expires: 259200
    }
});

module.exports = TokenSchema;