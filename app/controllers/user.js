const passwordHash = require('../config/utils/passwordHash');
const { InvalidUserError } = require("../config/errors");

const { User, Classroom } = require("../models");

const ioEmit = require("./utils/ioEmit");

/** CONTROLLER METHODS **/

const update = async ({ user, userData }) => {
    
    const updateList = [];

    // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

    ["name", "email"].forEach(key => {
        if ( userData.hasOwnProperty(key) ) updateList.push([key, userData[key]]);
    });

    if (userData.password) updateList.push(["password", await passwordHash(userData.password)]);

    if (updateList.length) await user.update(Object.fromEntries(updateList));

}

/**
 * Disassociate the currect user from a classroom.
 * - Removes the classroom ID from the user.
 * - Removes the staff entry
 * - Removes the staff reference from the classroom.
 */
const leaveRoom = async ({ roomId, user, classroom, staffMember }) => {

    // TODO role authentication should be moved to validation middleware.
    if ( staffMember.role === "instructor" ) throw new InvalidUserError( "Instructors cannot leave rooms." );

    const memberId = staffMember._id;

    await staffMember.remove();

    await classroom.save();

    await user.update({ $pull: { classrooms: roomId } });

    ioEmit( "dispatch", { type: "REMOVE_STAFF", payload: memberId }, `room:${roomId}` );

}

/**
 * Removes a room's id from all associated user docs to remove all direct associations starting from a user. The room
 * and staff are left intact,so they can later be brought back if needed.
 * - Removes the classroom ID from all known associated users.
 */
const archiveRoom = async ({ roomId, classroom, staffMember }) => {

    // TODO role authentication should be moved to validation middleware.
    if ( staffMember.role !== "instructor" ) throw new InvalidUserError( "Only instructors can archive a room." );

    const staffUserIds = classroom.staff.map(({ user }) => user);

    await User.updateMany({ _id: { $in: staffUserIds } }, { $pull: { classrooms: roomId } });

}

const getRoomsShort = async ({ user }) =>
    await Classroom
        .find({ _id: { $in: user.classrooms } })
        .select("name staff.role staff.user");

module.exports = {
    update,
    leaveRoom,
    archiveRoom,
    getRoomsShort
};