const Role = require("../Role");

const instructorRole = new Role( "instructor", "Instructor", [
    "viewRoom",
    "updateRoom",
    "archiveRoom"
] );

module.exports = instructorRole;