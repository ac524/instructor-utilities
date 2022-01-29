const { AuthenticationError } = require("apollo-server-express");
const permissions = require("../../config/permissions");

const validateMemberPermissions = ({
    context: {
        member,
        permission
    }
}, next) => {

    if( !member.isAllowedTo( permission ) )

        throw new AuthenticationError( `You are not allowed to ${permission}.` );

    return next();

}

const usePermissionContextSet = (set,type) => {

    if( !permissions[set] ) throw Error( `Permission ${set} does not exist.` );

    if( !permissions[set][type] ) throw Error( `The ${set} permission set does not support the ${type} permission.` );

    const setPermissionContext = 
        ({ context }, next) => {
        
            context.permission = permissions[set][type];
        
            return next();
        
        }

    return [
        setPermissionContext,
        validateMemberPermissions
    ]
}

exports.validateMemberPermissions = validateMemberPermissions;
exports.usePermissionContextSet = usePermissionContextSet;