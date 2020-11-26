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
    perms.DELETE_STUDENT,

    /** INVITES **/
    perms.CREATE_INVITE,
    perms.VIEW_INVITE,
    perms.DELETE_INVITE,

    /** FEED PERMISSIONS **/
    perms.VIEW_FEED,

    /** COMMENT PERMISSIONS **/
    perms.CREATE_FEED_COMMENT,

    /** COMMENT PERMISSIONS **/
    perms.CREATE_FEED_ELEVATE,

    /** COMMENT PERMISSIONS **/
    perms.CREATE_FEED_DEELEVATE

] );

module.exports = instructorRole;