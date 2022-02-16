const { AuthenticationError } = require("apollo-server-express");

const permissions = require("../../config/permissions");

const { useAuthentication } = require('./authentication');
const setRoomContext = require('./setRoomContext');
const setMemberContext = require('./setMemberContext');

/**
 * @callback next
 * 
 * @typedef PermissionContext
 * @property {String} permission
 * 
 * @callback SetPermissionContext
 * @param {String} param0
 * @param {Object} param0.context
 * @param {next} next
 * @returns {*}
 * 
 * Validates provided permissions and makes a middleware method.
 * @param {String} set The permission set to use
 * @param {String} ability The permission set ability to target
 * @returns {SetPermissionContext}
 */
 const makeSetPermissionContext = (set,ability) => {

    if( !permissions[set] ) throw Error( 'Invalid permission set' );

    if( !permissions[set][ability] ) throw Error( 'Invalid ability for permission set' );

    return ({ context }, next) => {
        
        context.permission = permissions[set][ability];
    
        return next();
    
    }

}

/**
 * @typedef {import('./setMemberContext').MemberContext & PermissionContext} ValidateMemberPermissionsContext
 * 
 * @param {Object} param0
 * @param {ValidateMemberPermissionsContext} param0.context
 * @param {next} next
 * @returns {*}
 */
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

/**
 * @typedef RoomMemberPermissionsConfig
 * @property {String} context
 * @property {String} set
 * @property {String} ability
 * 
 * @param {RoomMemberPermissionsConfig} param0 
 * @returns {Array}
 */
const useRoomMemberPermissions = ({
    context,
    set,
    ability
}) => {
    if( !(context in setRoomContext) )

        throw Error( 'Invalid room context provided for member permissions.' );

    return [
        ...useAuthentication(),
        setRoomContext[context],
        setMemberContext,
        makeSetPermissionContext(set,ability),
        validateMemberPermissions
    ]
}

exports.validateMemberPermissions = validateMemberPermissions;
exports.makeSetPermissionContext = makeSetPermissionContext;
exports.useRoomMemberPermissions = useRoomMemberPermissions;