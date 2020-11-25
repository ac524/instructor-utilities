const Role = require("../Role");

const perms = require("../");

const instructorRole = new Role( "instructor", "Instructor", [

    /** ROOM **/
    perms.VIEW_ROOM,
    perms.UPDATE_ROOM,
    perms.ARCHIVE_ROOM,

    /** STUDENT **/
    perms.CREATE_STUDENT,
    perms.VIEW_STUDENT,
    perms.UPDATE_STUDENT,
    perms.DELETE_STUDENT

] );

module.exports = instructorRole;