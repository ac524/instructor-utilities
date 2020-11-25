const Role = require("../Role");

const perms = require("../");

const taRole = new Role( "ta", "TA", [

    /** ROOM **/
    perms.VIEW_ROOM,
    perms.LEAVE_ROOM,

    /** STUDENT **/
    perms.CREATE_STUDENT,
    perms.VIEW_STUDENT,
    perms.UPDATE_STUDENT

] );

module.exports = taRole;