const { AuthenticationError } = require("apollo-server-express");

const permissions = require("../../config/permissions");

const { useAuthentication } = require('./authentication');
const setRoomContext = require('./setRoomContext');
const setMemberContext = require('./setMemberContext');

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

const makeSetPermissionContext = (set,type) => {

    if( !permissions[set] ) throw Error( `Permission ${set} does not exist.` );

    if( !permissions[set][type] ) throw Error( `The ${set} permission set does not support the ${type} permission.` );

    return ({ context }, next) => {
        
        context.permission = permissions[set][type];
    
        return next();
    
    }

}

const useRoomMemberPermissions = ({
    context,
    set,
    type
}) => {
    if( !(context in setRoomContext) )

        throw Error( 'Invalid room context provided for member permissions.' );

    return [
        ...useAuthentication(),
        setRoomContext[context],
        setMemberContext,
        makeSetPermissionContext(set,type),
        validateMemberPermissions
    ]
}

exports.validateMemberPermissions = validateMemberPermissions;
exports.makeSetPermissionContext = makeSetPermissionContext;
exports.useRoomMemberPermissions = useRoomMemberPermissions;