const Role = require("../Role");

const {
    VIEW_ROOM,
    LEAVE_ROOM
} = require("../");

const taRole = new Role( "instructor", "Instructor", [
    VIEW_ROOM,
    LEAVE_ROOM
] );

module.exports = taRole;