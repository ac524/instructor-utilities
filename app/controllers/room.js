const { Room } = require("../models");

const actions = require("./actions");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../models/schema/MemberSchema').MemberDocument} MemberDocument
 * @typedef {import('../config/validation/definitions/roomValidation').RoomData} RoomData
 */

/** CONTROLLER METHODS **/

/**
 * @typedef GetRoomOptions
 * @property {ObjectId} roomId
 * 
 * @param {GetRoomOptions} param0 
 */
const getSingle = async ({ roomId }) => {

    const room = await actions.getOne( Room, roomId, {
        populate: [
            ["staff.user", "name email date"],
            "invites.token"
        ]
    } );

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

    await actions.updateOne( Room, {
        docId: roomId,
        data: roomData
    } );

}

module.exports = {
    getSingle,
    getPermissions,
    update
}