const Role = require("../Role");

const perms = require("../");

const taRole = new Role( "ta", "TA", [

    /** ROOM **/
    perms.VIEW_ROOM,
    perms.LEAVE_ROOM,

    /** STUDENT **/
    perms.VIEW_STUDENT,
    perms.UPDATE_STUDENT,

    /** FEED PERMISSIONS **/
    perms.VIEW_FEED,

    /** COMMENT PERMISSIONS **/
    perms.CREATE_FEED_COMMENT,

    /** COMMENT PERMISSIONS **/
    perms.CREATE_FEED_ELEVATE,

    /** COMMENT PERMISSIONS **/
    perms.CREATE_FEED_DEELEVATE

] );

module.exports = taRole;