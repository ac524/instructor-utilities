/**
 * @callback next
 * 
 * @typedef RoomContext
 * @property {import('~crsmmodels/schema/RoomSchema').RoomDocument} room
 */

const roomQueryConfig = { select: "staff" };

/**
 * Ensures a room was set to context
 * @param {Object} param0
 * @param {?import('~crsmmodels/schema/RoomSchema').RoomDocument} param0.room
 */
const validateRoomContext = ({ room }) => {
    if( !room ) throw Error("Unable to locate associated room")
};

/**
 * Sets `room` context from a provided `roomId` arg
 * @param {Object} param0 
 * @param {Object} param0.args
 * @param {import('mongoose').Schema.Types.ObjectId} param0.args.roomId
 * @param {import('../context/db').DbContext} param0.context
 * @param {next} next 
 * @returns {*}
 */
const fromRoomId = async ({
    args: { roomId },
    context
}, next) => {

    const { db } = context;
    
    context.room = await db.get("room").findOne({ docId: roomId }, roomQueryConfig);

    validateRoomContext( context );

    return next();

}

/**
 * @typedef SetRoomFromStudentIdArgs
 * @property {import('mongoose').Schema.Types.ObjectId} roomtId
 * @property {import('mongoose').Schema.Types.ObjectId} roomStudentId
 * 
 * Sets `room` context from a provided `studentId` arg
 * @param {Object} param0
 * @param {SetRoomFromStudentIdArgs} param0.args
 * @param {import('../context/db').DbContext} param0.context
 * @param {next} next 
 * @returns {*}
 */
const fromStudentId = async ({
    args: { roomId, roomStudentId },
    context
}, next) => {

    const { db } = context;

    context.room = roomId
        ? await db.get("room").findOne({ docId: roomId }, roomQueryConfig)
        : await db.get("room.student").findOwner({ docId: roomStudentId }, roomQueryConfig);

    validateRoomContext( context );

    return next();

}

const setRoomContext = {
    roomQueryConfig,
    fromRoomId,
    fromStudentId
}

module.exports = setRoomContext;