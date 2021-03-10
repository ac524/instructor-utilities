const Schema = require("mongoose").Schema;
const { ObjectId } = Schema.Types;

/**
 * @typedef {Object} UserSchema
 * @property {String} name
 * @property {String} email
 * @property {Boolean} isVerified
 * @property {String} password
 * @property {ObjectId[]} classrooms
 * 
 * @typedef {import('mongoose').Document & UserSchema} UserDocument
 */
const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    },
    classrooms: [
      {
        type: ObjectId,
        ref: "Classroom"
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = UserSchema;