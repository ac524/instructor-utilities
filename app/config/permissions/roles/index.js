const instructorRole = require("./instructorRole");
const taRole = require("./taRole");

const roles = new Map();

const addRole = roleType => roles.set( roleType.key, roleType );

addRole( instructorRole );
addRole( taRole );

module.exports = roles;