const { Room } = require("../../models");

const SchemaController = require("../types/SchemaController");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../../models/schema/MemberSchema').MemberDocument} MemberDocument
 */

/**
 * TYPE DEFINITIONS FOR METHODS
 * 
 * RoomController.getAggregate()
 * @typedef GetAggregateOptions
 * @property {ObjectId} roomId
 * 
 * RoomController.getPermissions()
 * @typedef GetPermissionsOptions
 * @property {MemberDocument} member
 */

class RoomController extends SchemaController {

    constructor() {

        super( 'room', Room );

    }

    /**
     * @param {GetAggregateOptions} param0 
     */
    async getAggregate({ roomId }) {

        const room = await this.findOne({ docId: roomId }, {
            populate: [
                ["staff.user", "name email date"],
                "invites.token"
            ]
        });

        return await room.getFeedAggregate();

    }

    /**
     * @param {GetPermissionsOptions} param0 
     */
    async getPermissions({ member }) {

        return member.getPermissionList();

    }

}

module.exports = RoomController;