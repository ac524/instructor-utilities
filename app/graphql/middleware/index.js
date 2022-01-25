const makeMiddlewareBundle = require('./makeMiddlewareBundle');
const requireVerifiedUser = require('./requireVerifiedUser');
const setAuthTokenUser = require('./setAuthTokenUser');
const setRoomContext = require('./setRoomContext');
const setMemberContext = require('./setMemberContext');
const makeSetPermissionContext = require('./makeSetPermissionContext');
const validateMemberPermissions = require('./validateMemberPermissions');

module.exports = {
    makeMiddlewareBundle,
    requireVerifiedUser,
    setAuthTokenUser,
    setRoomContext,
    setMemberContext,
    makeSetPermissionContext,
    validateMemberPermissions
}