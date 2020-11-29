const passwordHash = require('../config/utils/passwordHash');

const { User, Room } = require("../models");

const actions = require("./actions");
const roomCtrl = require("./room");

const ioEmit = require("./utils/ioEmit");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('../models/schema/UserSchema').UserDocument} UserDocument
 * @typedef {import('../models/schema/RoomSchema').RoomDocument} RoomDocument
 * @typedef {import('../models/schema/RoomSchema').MemberDocument} MemberDocument
 * @typedef {import('../config/validation/definitions/userValidation').UserData} UserData
 */

/** CONTROLLER METHODS **/

/**
 * @param {UserData} param0
 * @returns {UserDocument}
 */
const create = async ( { password, ...data } ) => await actions.createOne( User, {
    ...data,
    password: await passwordHash( password )
} );

/**
 * @param {UserData} search
 * @returns {UserDocument}
 */
const findOne = async ( search ) => await actions.findOne( User, search );

/**
 * @typedef UpdateUserOptions
 * @property {UserDocument} user
 * @property {UserData} userData
 * 
 * @param {UpdateUserOptions} param0 
 */
const update = async ({ userId, user, userData: { password, ...userData } }) => {

    await actions.updateOne( User, {
        docId: userId,
        doc: user,
        data: {
            ...userData,
            password: password && await passwordHash( userData.password )
        }
    } );

}

/**
 * @typedef LeaveUserRoomOptions
 * @property {string} roomId
 * @property {UserDocument} user
 * @property {RoomDocument} room
 * @property {MemberDocument} member
 * 
 * @param {LeaveUserRoomOptions} param0 
 */
const leaveRoom = async ({ roomId, user, room, member }) => {

    const memberId = member._id;

    await member.remove();

    await room.save();

    await user.update({ $pull: { classrooms: roomId } });

    ioEmit( "dispatch", { type: "REMOVE_STAFF", payload: memberId }, `room:${roomId}` );

}

/**
 * @typedef ArchiveUserRoomOptions
 * @property {string} roomId
 * @property {RoomDocument} room
 * 
 * @param {ArchiveUserRoomOptions} param0 
 */
const archiveRoom = async ({ roomId, room }) => {

    const staffUserIds = room.staff.map(({ user }) => user);

    await actions.updateMany( User, {
        search: { _id: { $in: staffUserIds } },
        data: { $pull: { classrooms: roomId } }
    } );

}

/**
 * @typedef GetUserRoomsShortOptions
 * @property {UserDocument} user
 * 
 * @param {GetUserRoomsShortOptions} param0 
 * 
 * // TODO detail return object.
 * @returns {RoomDocument[]}
 */
const getRoomsShort = async ({ user }) => await roomCtrl.getDocs( { _id: { $in: user.classrooms } }, { select: "name staff.role staff.user" } );

module.exports = {
    create,
    findOne,
    update,
    leaveRoom,
    archiveRoom,
    getRoomsShort
};