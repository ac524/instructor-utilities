const mongoose = require( "mongoose" );

const RoomSchema = require( "./schema/RoomSchema" );

module.exports = mongoose.model( "Classroom", RoomSchema );