const PermissionSet = require("./PermissionSet");

class Role {

    constructor( key, name, config ) {

        this.key = key;
        this.name = name;
        this.permissions = new PermissionSet( config );

    }

}

module.exports = Role;