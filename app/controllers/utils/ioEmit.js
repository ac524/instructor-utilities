const { io } = require("../../config/express");

const ioEmit = ( action, message, room ) => (room ? io.to(room) : io).emit( action, message );

module.exports = ioEmit;