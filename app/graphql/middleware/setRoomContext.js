const getRoom = async ( db, docId ) => {
    const room = await db.get("room")
        .findOne( { docId }, { select: "staff" } );

    if( !room ) throw Error("Unable to locate associated room");

    return room;
}

const fromRoomId = async ({
    args: { roomId },
    context
}, next) => {

    const { db } = context;
    
    context.room = await getRoom( db, roomId );

    return next();

}

const setRoomContext = {
    fromRoomId
}

module.exports = setRoomContext;