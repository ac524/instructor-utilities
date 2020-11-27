const { Room } = require("../models");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../models/schema/MemberSchema').MemberDocument} MemberDocument
 * @typedef {import('../validation/definitions/roomValidation').RoomData} RoomData
 */

/** CONTROLLER METHODS **/

/**
 * @typedef GetRoomOptions
 * @property {ObjectId} roomId
 * 
 * @param {GetRoomOptions} param0 
 */
const getSingle = async ({ roomId }) => {

        const room =
            await Room.findById( roomId )
                .populate("staff.user", "name email date")
                .populate("invites.token");

        return await room.getFeedAggregate();

}

/**
 * @typedef GetRoomPermissionsOptions
 * @property {MemberDocument} member
 * 
 * @param {GetRoomPermissionsOptions} param0 
 */
const getPermissions = async ({ member }) => {

    return member.getPermissionList();

}

/**
 * @typedef UpdateRoomOptions
 * @property {ObjectId} roomId
 * @property {RoomData} roomData
 * 
 * @param {UpdateRoomOptions} param0 
 */
const update = async ({ roomId, roomData }) => {

    await Room.findByIdAndUpdate( roomId, roomData );

}

module.exports = {
    getSingle,
    getPermissions,
    update
}