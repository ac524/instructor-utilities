const passwordHash = require('../config/utils/passwordHash');

const { User, Room } = require("../models");

const ioEmit = require("./utils/ioEmit");

/** CONTROLLER METHODS **/

const update = async ({ user, userData: { password, ...userData } }) => {

    if( password ) userData.password = await passwordHash( userData.password );

    if (updateList.length) await user.update( userData );

}

/**
 * Disassociate the currect user from a classroom.
 * - Removes the classroom ID from the user.
 * - Removes the staff entry
 * - Removes the staff reference from the classroom.
 */
const leaveRoom = async ({ roomId, user, room, member }) => {

    const memberId = member._id;

    await member.remove();

    await room.save();

    await user.update({ $pull: { classrooms: roomId } });

    ioEmit( "dispatch", { type: "REMOVE_STAFF", payload: memberId }, `room:${roomId}` );

}

/**
 * Removes a room's id from all associated user docs to remove all direct associations starting from a user. The room
 * and staff are left intact,so they can later be brought back if needed.
 * - Removes the classroom ID from all known associated users.
 */
const archiveRoom = async ({ roomId, room }) => {

    const staffUserIds = room.staff.map(({ user }) => user);

    await User.updateMany({ _id: { $in: staffUserIds } }, { $pull: { classrooms: roomId } });

}

const getRoomsShort = async ({ user }) =>
    await Room
        .find({ _id: { $in: user.classrooms } })
        .select("name staff.role staff.user");

module.exports = {
    update,
    leaveRoom,
    archiveRoom,
    getRoomsShort
};