const passwordHash = require('../config/utils/passwordHash');

const { User, Room } = require("../models");

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
const create = async ( { password, ...data } ) => {

    const user = new User({
        ...data,
        password: await passwordHash( password )
    });

    await user.save();

    return user;

}

/**
 * @param {UserData} search 
 */
const findOne = async ( search ) => await User.findOne( search );

/**
 * @typedef UpdateUserOptions
 * @property {UserDocument} user
 * @property {UserData} userData
 * 
 * @param {UpdateUserOptions} param0 
 */
const update = async ({ userId, user, userData: { password, ...userData } }) => {

    if( password ) userData.password = await passwordHash( userData.password );

    user
    
        ? await user.update( userData )
        
        : await User.findByIdAndUpdate( userId, userData );

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

    await User.updateMany({ _id: { $in: staffUserIds } }, { $pull: { classrooms: roomId } });

}

/**
 * @typedef GetUserRoomsShortOptions
 * @property {UserDocument} user
 * 
 * @param {GetUserRoomsShortOptions} param0 
 */
const getRoomsShort = async ({ user }) =>
    await Room
        .find({ _id: { $in: user.classrooms } })
        .select("name staff.role staff.user");

module.exports = {
    create,
    findOne,
    update,
    leaveRoom,
    archiveRoom,
    getRoomsShort
};