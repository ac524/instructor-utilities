const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

/**
 * @typedef {Object} InvitesSchema
 * @property {string} email
 * @property {ObjectId} token
 * 
 * @typedef {import('mongoose').Document & InvitesSchema} InviteDocument
 */
const InviteSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    token: {
      type: ObjectId,
      ref:"Token",
    }
});

module.exports = InviteSchema;