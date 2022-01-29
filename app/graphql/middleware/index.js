const makeMiddlewareBundle = require('./makeMiddlewareBundle');
const requireVerifiedUser = require('./requireVerifiedUser');
const setAuthTokenUser = require('./setAuthTokenUser');
const setRoomContext = require('./setRoomContext');
const setMemberContext = require('./setMemberContext');
const { usePermissionContextSet } = require('./permissions');

module.exports = {
    makeMiddlewareBundle,
    requireVerifiedUser,
    setAuthTokenUser,
    setRoomContext,
    setMemberContext,
    usePermissionContextSet
}