const instructorRole = require("./instructorRole");
const taRole = require("./taRole");

module.exports = {
    [instructorRole.key]: instructorRole,
    [taRole.key]: taRole
}