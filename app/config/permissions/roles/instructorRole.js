const Role = require("../Role");

const {
    VIEW_ROOM,
    UPDATE_ROOM,
    ARCHIVE_ROOM
} = require("../");

const instructorRole = new Role( "instructor", "Instructor", [
    VIEW_ROOM,
    UPDATE_ROOM,
    ARCHIVE_ROOM
] );

module.exports = instructorRole;