const permissions = require("./");

const makePermEntry = permission => [ permission, 1 ];
const permExists = permission => permissions.hasOwnProperty(permission);

class Role {

    /**
     * @param {string} key 
     * @param {string} name 
     * @param {array} permissions 
     */
    constructor( key, name, permissions ) {

        this.key = key;
        this.name = name;

        this.permissions = new Map( permissions.filter( permExists ).map( makePermEntry ) );

    }

    can( permission ) {

        console.log( this, this.permissions );

        return this.permissions.has( permission );

    }

}

module.exports = Role;