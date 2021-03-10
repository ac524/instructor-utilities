const roles = require("../../../../../config/permissions/roles");

module.exports = {

    isAllowedTo: function( permission ) {

        if( !roles.has( this.role ) ) return false;

        return roles.get( this.role ).can( permission );
      
    },

    getPermissionList: function() {

        return roles.get( this.role ).list;

    }

}