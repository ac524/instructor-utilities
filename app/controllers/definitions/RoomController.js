const { Room } = require("./models");
const SchemaController = require("../types/SchemaController");

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
      
      if(createdBy){
        data.staff = {
          role: "instructor",
          user: createdBy._id,
        };
      }
      
      const newClassroom = await super.createOne(
        {
          ...options,
          data,
        },
        createConfig
      );

      if(createdBy){
        await this
          .effect("user")
          .updateOne({
            docId: createdBy._id,
            data: {
              $push: { classrooms: newClassroom._id },
            },
          });
      }
      return newClassroom;
    }

    async findOne( options, queryOptions = {} ) {

        return super.findOne( options, {
            populate: [
                ["staff.user", "name email date"],
                "invites.token",
                "apps"
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