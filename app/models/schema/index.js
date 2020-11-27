/**
 * @typedef {import('./MemberSchema').MemberDocument} MemberDocument
 * @typedef {import('./MemberSchema').MemberSchema} MemberSchema
 */
const MemberSchema = require("./MemberSchema");

/**
 * @typedef {import('./InviteSchema').InviteDocument} InviteDocument
 * @typedef {import('./InviteSchema').InvitesSchema} InvitesSchema
 */
const InviteSchema = require("./InviteSchema");

/**
 * @typedef {import('./StudentSchema').StudentDocument} StudentDocument
 * @typedef {import('./StudentSchema').StudentSchema} StudentSchema
 */
const StudentSchema = require("./StudentSchema");

/**
 * @typedef {import('./RoomSchema').RoomDocument} RoomDocument
 * @typedef {import('./RoomSchema').RoomSchema} RoomSchema
 */
const RoomSchema = require("./RoomSchema");

module.exports = {
    InviteSchema,
    MemberSchema,
    StudentSchema,
    RoomSchema
};