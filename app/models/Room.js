const mongoose = require( "mongoose" );

const { RoomSchema } = require( "./schema" );

module.exports = mongoose.model( "Classroom", RoomSchema );