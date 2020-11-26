const Role = require("../Role");

const perms = require("../");

const taRole = new Role( "ta", "TA", [

    /** ROOM **/
    perms.room.view,
    perms.room.leave,

    /** STUDENT **/
    perms.student.view,
    perms.student.update,

    /** FEED PERMISSIONS **/
    perms.feed.view,

    /** FEED COMMENT PERMISSIONS **/
    perms.feedComment.create,

    /** FEED ELEVATE PERMISSIONS **/
    perms.feedElevate.create,

    /** FEED DEELEVATE PERMISSIONS **/
    perms.feedDeelevate.create

] );

module.exports = taRole;