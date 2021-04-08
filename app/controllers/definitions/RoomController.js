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
      //TODO extend data.staff with and instructor role. The user's id will come from createdBy._id.
      data.staff = {
        role: "instructor",
        user: createdBy._id,
      };

      console.log("\x1b[31m", "Line 34 useEffect:", this.effect());

      const newClassroom = await super.createOne(
        {
          ...options,
          data,
        },
        createConfig
      );

      console.log(newClassroom)
      await this
        // Use the new `this.effect()` function to access the `user` controller.
        .effect("user")
        // Call the `updateOne()` method
        .updateOne({
          docId: {
            _id: createdBy._id,
          },
          data: {
            classrooms: newClassroom._id,
          },
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