const { Room } = require("../models");

const actions = require("./actions");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../models/schema/MemberSchema').MemberDocument} MemberDocument
 * @typedef {import("../models/schema/RoomSchema").RoomDocument} RoomDocument
 * @typedef {import('../config/validation/definitions/roomValidation').RoomData} RoomData
 * @typedef {import('./actions/createOne').CreateDocOptions} CreateDocOptions
 * @typedef {import('./actions/utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/** CONTROLLER METHODS **/

/**
 * @param {RoomData} data 
 * @param {CreateDocOptions} config 
 * 
 * @returns {RoomDocument}
 */
const create = async ( data, config ) => await actions.createOne( Room, data, config );

/**
 * @typedef GetRoomOptions
 * @property {ObjectId} roomId
 * 
 * @param {GetRoomOptions} param0 
 * 
 * @returns {Object}
 */
const getSingle = async ({ roomId }) => {

    const room = await getDoc( { roomId }, {
        populate: [
            ["staff.user", "name email date"],
            "invites.token"
        ]
    } );

    return await room.getFeedAggregate();

}

/**
 * @typedef GetRoomDocOptions
 * @property {ObjectId} roomId
 * 
 * @param {RoomData} search 
 * @param {QueryModifierOptions} queryOptions
 * 
 * @returns {RoomDocument}
 */
const getDoc = async ( { roomId, search }, queryOptions ) => {

    return roomId

        ? await actions.getOne( Room, roomId, queryOptions )

        : await actions.findOne( Room, search, queryOptions );

}

/**
 * @param {RoomData} search 
 * @param {QueryModifierOptions} queryOptions
 * 
 * @returns {RoomDocument[]}
 */
const getDocs = async ( search, queryOptions ) => await actions.findMany( Room, { search }, queryOptions );

/**
 * @typedef GetRoomPermissionsOptions
 * @property {MemberDocument} member
 * 
 * @param {GetRoomPermissionsOptions} param0
 * 
 * @returns {Array}
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
 * @param {QueryModifierOptions} queryOptions
 */
const update = async ({ roomId, room, search, roomData }, queryOptions) => {

    await actions.updateOne( Room, {
        docId: roomId,
        doc: room,
        search,
        data: roomData
    }, queryOptions );

}

module.exports = {
    create,
    getSingle,
    getDoc,
    getDocs,
    getPermissions,
    update
}