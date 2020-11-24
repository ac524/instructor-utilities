class PermissionSet {

    /** Room Permissions **/
    viewRoom;
    updateRoom;
    leaveRoom;
    archiveRoom;

    constructor( enabled ) {


        for( const key of enabled ) this[key] = true;

        for( const key of Object.keys(this) ) if( !this[key] ) this[key] = false;

    }

}

module.exports = PermissionSet;