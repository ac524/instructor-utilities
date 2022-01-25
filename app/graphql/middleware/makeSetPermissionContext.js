const permissions = require("../../config/permissions");

const makeSetPermissionContext = (set,type) => {

    if( !permissions[set] ) throw Error( `Permission ${set} does not exist.` );

    if( !permissions[set][type] ) throw Error( `The ${set} permission set does not support the ${type} permission.` );

    return ({ context }, next) => {
    
        context.permission = permissions[set][type];
    
        return next();
    
    }
}
    

module.exports = makeSetPermissionContext;