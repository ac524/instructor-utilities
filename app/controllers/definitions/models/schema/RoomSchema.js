const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const { ObjectId: ObjectIdType } = mongoose.Types;

/**
 * Type Definition Imports
 * @typedef {import('./InviteSchema').InviteDocument} InviteDocument
 * @typedef {import('./MemberSchema').MemberDocument} MemberDocument
 * @typedef {import('./StudentSchema').StudentDocument} StudentDocument
 */

const InviteSchema = require("./InviteSchema");
const MemberSchema = require("./MemberSchema");
const StudentSchema = require("./StudentSchema");

const appTypeLibrary = require("../../../../config/apps/library");

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
      ref:"AppType",
    }],
    date: {
      type: Date,
      default: Date.now
    }
}, { toJSON: { virtuals: true } });

// RoomSchema.virtual('fields').get(function() {

//   const fieldsDefault = {
//     student: []
//   };

//   if( !this.apps || !this.apps.length ) return fieldsDefault;

//   return this.apps.reduce((fields, item) => {

//     const isDocId = ObjectIdType.isValid(item);
    
//     const appType = isDocId
    
//       ? appTypeLibrary.get( appTypeId.toString() )

//       // If it's not a doc id, the expect it to be the document.
//       : item;

//     // TODO Maybe look at pulling in an object merging utility if more field types are added.
//     return {
//       student: [
//         ...fields.student,
//         ...appType.fields.student
//       ]
//     };

//   }, fieldsDefault);

// });

module.exports = RoomSchema;