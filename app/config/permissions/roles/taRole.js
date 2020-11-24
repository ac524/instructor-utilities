const Role = require("../Role");

const taRole = new Role( "instructor", "Instructor", [
    "viewRoom",
    "leaveRoom"
] );

module.exports = taRole;