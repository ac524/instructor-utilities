/**
 * @callback next
 * 
 * @typedef RoomContext
 * @property {import('~crsmmodels/schema/RoomSchema').RoomDocument} room
 */

/**
 * Fetches a room document with staff selected
 * @param {Map} db 
 * @param {import('mongoose').Schema.Types.ObjectId} docId 
 * @returns {import('~crsmmodels/schema/RoomSchema').RoomDocument}
 */
 const getRoom = async ( db, docId ) => {
    const room = await db.get("room")
        .findOne( { docId }, { select: "staff" } );

    if( !room ) throw Error("Unable to locate associated room");

    return room;
}

/**
 * Loads a room document from a provided `roomId` arg
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
    
    context.room = await getRoom( db, roomId );

    return next();

}

const setRoomContext = {
    getRoom,
    fromRoomId
}

module.exports = setRoomContext;