const setRoomContext = require('./setRoomContext');
const setMemberContext = require('./setMemberContext');
const { useAuthUserSet } = require('./authentication');
const { usePermissionContextSet } = require('./permissions');

module.exports = {
    useAuthUserSet,
    setRoomContext,
    setMemberContext,
    usePermissionContextSet
}