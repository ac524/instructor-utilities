const passwordHash = require('../config/utils/passwordHash');

const { User } = require("../models");

const SchemaController = require("./SchemaController");

const roomCtrl = require("./room");

const ioEmit = require("./utils/ioEmit");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * @typedef {import('./SchemaController').CreateDocOptions} CreateDocOptions
 * @typedef {import('./SchemaController').CreateDocConfig} CreateDocConfig
 * @typedef {import('./SchemaController').UpdateDocOptions} UpdateDocOptions
 * @typedef {import('./utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * TYPE DEFINITIONS FOR METHODS
 * 
 * UserController.getRoomsBasics()
 * @typedef GetUserRoomsBasicsOptions
 * @property {UserDocument} user
 * 
 * UserController.leaveRoom()
 * @typedef LeaveUserRoomOptions
 * @property {UserDocument} user
 * @property {ObjectId} roomId
 * @property {RoomDocument} room
 * @property {MemberDocument} member
 * 
 * UserController.archiveRoom()
 * @typedef ArchiveUserRoomOptions
 * @property {ObjectId} roomId
 * @property {RoomDocument} room
 */

/** CONTROLLER DEFINITION **/
class UserController extends SchemaController {

    constructor() {

        super( 'user', User );

    }

    /**
     * @param {CreateDocOptions} param0 
     * @param {CreateDocConfig} config
     * 
     * @returns {MongoDocument}
     */
    async createOne( { data: { password, ...data } }, config ) {

        return super.createOne({
            data: {
                ...data,
                // Hash the password before saving.
                password: await passwordHash( password )
            }
        }, config);

    }

    /**
     * @param {UpdateDocOptions} param1 
     * @param {QueryModifierOptions} queryOptions
     * 
     * @returns {MongoDocument}
     */
    async updateOne( { data: { password, ...data }, ...updateOptions }, queryOptions ) {

        if( password ) data.password = await passwordHash( password );

        return super.updateOne({
            ...updateOptions,
            data
        }, queryOptions);

    }

    /**
     * @param {GetUserRoomsBasicsOptions} param0 
     * 
     * // TODO detail return object.
     * @returns {RoomDocument[]}
     */
    async getRoomsBasics( { user } ) {

        return await roomCtrl.getDocs( { _id: { $in: user.classrooms } }, { select: "name staff.role staff.user" } );

    }

    /**
     * @param {LeaveUserRoomOptions} param0 
     */
    async leaveRoom( { roomId, user, room, member } ) {

        const memberId = member._id;

        await member.remove();

        await room.save();

        await user.update({ $pull: { classrooms: roomId } });

        ioEmit( "dispatch", { type: "REMOVE_STAFF", payload: memberId }, `room:${roomId}` );

    }

    /**
     * @param {ArchiveUserRoomOptions} param0 
     */
    async archiveRoom({ roomId, room }) {

        const staffUserIds = room.staff.map(({ user }) => user);

        await this.updateMany( {
            search: { _id: { $in: staffUserIds } },
            data: { $pull: { classrooms: roomId } }
        } );

    }

}

module.exports = new UserController();