class PermissionSet {

    /** Room Permissions **/
    viewRoom;
    updateRoom;
    leaveRoom;
    archiveRoom;

    constructor( enabled ) {

        // Toggle enabled keys to true.
        for( const key of enabled ) this[key] = true;

        // Validate all object properties, setting them explicity to `false` if the key is not `true`, so that all keys will be a Boolen type value.
        for( const key of Object.keys(this) ) if( !this[key] ) this[key] = false;

    }

}

module.exports = PermissionSet;