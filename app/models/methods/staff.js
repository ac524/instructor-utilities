const roles = require("../../config/permissions/roles");

module.exports = {

    isAllowedTo: function( permission ) {

        console.log( this.role, roles.has( this.role ) );

        if( !roles.has( this.role ) ) return false;

        console.log( permission, roles.get( this.role ).can( permission ) );

        return roles.get( this.role ).can( permission );
      
    }

}