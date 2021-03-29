const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

const methods = require("./methods");

/**
 * @typedef {Object} MemberSchema
 * @property {ObjectId} _id
 * @property {string} role
 * @property {ObjectId} user
 * 
 * @property {*} isAllowedTo
 * @property {*} getPermissionList
 * 
 * @typedef {import('mongoose').Document & MemberSchema} MemberDocument
 */
const MemberSchema = new Schema({
    role: {
      type: String,
      required: true
    },
    user: {
        type: ObjectId,
        ref:'User',
        required: true
    },
    meta: {
      type: Map,
      default: {}
    },
    date: {
      type: Date,
      default: Date.now
    }
});

MemberSchema.methods.isAllowedTo = methods.isAllowedTo;
MemberSchema.methods.getPermissionList = methods.getPermissionList;

module.exports = MemberSchema;