const { Room } = require("./models");
const userCtrl = require("../user"); // Import the user ctrl instance from one folder up

const SchemaController = require("../types/SchemaController");
const UserController = require("./UserController");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('./models/schema/MemberSchema').MemberDocument} MemberDocument
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

    async createOne( { data, createdBy, ...options }, createConfig = {} ) {
      //TODO extend data.staff with and instructor role. The user's id will come from createdBy._id.
        console.log("\x1b[31m", "Line 34 createdBy:", createdBy);
        data.staff = {
            role:"instructor",
            user: createdBy
        }
        
        const newClassroom = super.createOne(
        {
            ...options,
            data,
        },
        createConfig
        );
        // TODO go update the user's classroom list with the new classroom._id.
    
        userCtrl.updateOne({
          docId: { _id: newClassroom._id },
          data: { doc: data.staff },
        });
     
      return newClassroom;
    }

    async findOne( options, queryOptions = {} ) {

        return super.findOne( options, {
            populate: [
                ["staff.user", "name email date"],
                "invites.token"
            ],
            ...queryOptions
        } );

    }
    /**
     * @param {GetPermissionsOptions} param0 
     */
    async getPermissions({ member }) {

        return member.getPermissionList();

    }

}

module.exports = RoomController;