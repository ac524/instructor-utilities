const passwordHash = require('../config/utils/passwordHash');
const validateRegisterInput = require("../config/validation/register");
const { RouteError } = require("../config/errors/RouteError");

const { User, Classroom } = require("../models");

const ioEmit = require("./utils/ioEmit");

const update = async ({ user, body }) => {

    const bodyKeys = Object.keys( body );
    const excludeFilters = ["name", "email", "password", "roomname", "code"].filter( filter => !bodyKeys.includes(filter) );
    const { errors, isValid } = validateRegisterInput( body, excludeFilters );

    // Check validation
    if (!isValid)

        throw new RouteError( 400, "Invalid update request.", errors );
    
    const updateList = [];

    // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

    ["name", "email"].forEach(key => {
        if ( body.hasOwnProperty(key) ) updateList.push([key, body[key]]);
    });

    if (body.password) updateList.push(["password", await passwordHash(body.password)]);

    if (updateList.length) await user.update(Object.fromEntries(updateList));

}

/**
 * Disassociate the currect user from a classroom.
 * - Removes the classroom ID from the user.
 * - Removes the staff entry
 * - Removes the staff reference from the classroom.
 */
const leaveRoom = async ({ roomId, user, classroom, roomStaffMember }) => {

    if ( roomStaffMember.role === "instructor" ) return res.status(401).send({ default: "Instructors cannot leave rooms." });

    const memberId = roomStaffMember._id;

    await roomStaffMember.remove();

    await classroom.save();

    await user.update({ $pull: { classrooms: roomId } });

    ioEmit( "dispatch", { type: "REMOVE_STAFF", payload: memberId }, `room:${roomId}` );

}

/**
 * Removes a room's id from all associated user docs to remove all direct associations starting from a user. The room
 * and staff are left intact,so they can later be brought back if needed.
 * - Removes the classroom ID from all known associated users.
 */
const archiveRoom = async ({ roomId, classroom, roomStaffMember }) => {

    if ( roomStaffMember.role !== "instructor" ) throw new RouteError( 401, "Only instructors can archive a room." );

    const staffUserIds = classroom.staff.map(({ user }) => user);

    await User.updateMany({ _id: { $in: staffUserIds } }, { $pull: { classrooms: roomId } });

}

const getRoomsShort = async ({ user }) => {
    return await Classroom
        .find({ _id: { $in: user.classrooms } })
        .select("name staff.role staff.user");
}

module.exports = {
    update,
    leaveRoom,
    archiveRoom,
    getRoomsShort
};