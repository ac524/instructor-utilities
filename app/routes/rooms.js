const { room: roomVal } = require("./validation");
const { room: roomPerm } = require("../config/permissions");

const ctrls = require("../controllers");

const isRoomMember = require("./middleware/isRoomMember");
const setRoom = require("./middleware/setRoom");

const createRouter = require("./utils/createRouter");

const sharedConfig = {
    auth: true,
    paramCheck: true,
    middleware: [ setRoom.fromParam, isRoomMember ],
};

module.exports = createRouter([
    ["/",{
        post: {
            defaultError: "create the room",
            validation: roomVal,
            auth: true,
            ctrl: ctrls.get("room")
        }
    }],

    ["/:roomId", {
        get: {
            defaultError: "get the room",
            permission: roomPerm,
            ctrl: ctrls.get("room")
        },
        patch: {
            defaultError: "update the room",
            validation: roomVal,
            permission: roomPerm,
            ctrl: ctrls.get("room")
        }
    }, sharedConfig],

    ["/:roomId/permissions", {
        get: {
            defaultError: "get your permissions for the room",
            ctrl: ctrls.get("room").binding.getPermissions
        }
    }, sharedConfig]

]);