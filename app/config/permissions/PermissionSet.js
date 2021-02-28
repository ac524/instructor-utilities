const { InvalidConfig } = require("~crsm/config/errors");

/**
 * @param {string} perm 
 */
const makePermMap = perm => [ perm, 1 ];

class PermissionSet {

    /**
     * @param {string} name 
     * @param {Array} permTypes 
     */
    constructor( name, permTypes ) {

        this.name = name;
        this.types = new Map( permTypes.map( makePermMap ) );

    }

    /**
     * @param {string} type
     * @throws {InvalidConfig}
     */
    validateType( type ) {

        if( !this.types.has(type) )

            throw new InvalidConfig( `${this.name} does not have a ${type} permission.` );

    }

    /**
     * @param {string} type 
     */
    makeKey( type ) {

        this.validateType( type );

        return `${type}_${this.name}`.replace(" ", "_").toUpperCase();

    }

    get create() {
        return this.makeKey( "create" );
    }

    get view() {
        return this.makeKey( "view" );
    }

    get update() {
        return this.makeKey( "update" );
    }

    get delete() {
        return this.makeKey( "delete" );
    }

}

module.exports = PermissionSet