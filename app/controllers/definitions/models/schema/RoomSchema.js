const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

/**
 * Type Definition Imports
 * @typedef {import('./InviteSchema').InviteDocument} InviteDocument
 * @typedef {import('./MemberSchema').MemberDocument} MemberDocument
 * @typedef {import('./StudentSchema').StudentDocument} StudentDocument
 */

const InviteSchema = require("./InviteSchema");
const MemberSchema = require("./MemberSchema");
const StudentSchema = require("./StudentSchema");

/**
 * @typedef {Object} RoomSchema
 * @property {ObjectId} _id
 * @property {string} name
 * @property {MemberDocument[]} staff
 * @property {StudentDocument[]} students
 * @property {InviteDocument[]} invites
 * @property {ObjectId} registerCode
 * @property {ObjectId[]} apps
 * 
 * @property {*} isAllowedTo
 * @property {*} getPermissionList
 * 
 * @typedef {import('mongoose').Document & RoomSchema} RoomDocument
 */
const RoomSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    staff: [MemberSchema],
    students: [StudentSchema],
    invites: [InviteSchema],
    registerCode: {
      type: ObjectId,
      ref:"Token",
    },
    apps: [{
      type: ObjectId,
      ref:"App",
    }],
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = RoomSchema;