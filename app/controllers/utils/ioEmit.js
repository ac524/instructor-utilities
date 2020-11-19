const { io } = require("../../config/express");

const ioEmit = ( action, message, room ) => {

    // Emit to the room if provided, else broadcast to all.
    (room ? io.to(room) : io).emit( action, message );
    
};

module.exports = ioEmit;