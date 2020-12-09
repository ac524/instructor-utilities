const Role = require("../Role");

const perms = require("../");

const instructorRole = new Role( "instructor", "Instructor", [

    /** ROOM **/
    perms.room.view,
    perms.room.update,
    perms.room.archive,

    /** STUDENT **/
    perms.student.create,
    perms.student.view,
    perms.student.update,
    perms.student.delete,

    /** INVITE **/
    perms.invite.create,
    perms.invite.view,
    perms.invite.delete,

    /** FEED PERMISSIONS **/
    perms.feed.view,

    /** FEED COMMENT PERMISSIONS **/
    perms.feedComment.create,

    /** FEED ELEVATE PERMISSIONS **/
    perms.feedElevate.create,

    /** FEED DEELEVATE PERMISSIONS **/
    perms.feedDeelevate.create

] );

module.exports = instructorRole;