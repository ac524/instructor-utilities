const { Room } = require("../models");

/** CONTROLLER METHODS **/

const getSingle = async ({ roomId }) => {

        const room =
            await Room.findById( roomId )
                .populate("staff.user", "name email date")
                .populate("invites.token");

        return await room.getFeedAggregate();

}

/**
 * @param {object} param0 
 * @param {object} param0.member - MemberSchema object
 */
const getPermissions = async ({ member }) => {

    return member.getPermissionList();

}

const update = async ({ roomId, roomData }) => {

    await Room.findByIdAndUpdate( roomId, roomData );

}

module.exports = {
    getSingle,
    getPermissions,
    update
}