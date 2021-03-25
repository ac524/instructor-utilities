const { register: roomVal } = require("./validation");
const { room: roomPerm } = require("../config/permissions");

const roomCtrl = require("../controllers/room");

const isRoomMember = require("./middleware/isRoomMember");
const setRoom = require("./middleware/setRoom");

const createRouter = require("./utils/createRouter");

const sharedConfig = {
    auth: true,
    paramCheck: true,
    middleware: [ setRoom.fromParam, isRoomMember ],
};

module.exports = createRouter([

    ["/:roomId", {
        get: {
            defaultError: "get the room",
            permission: roomPerm,
            ctrl: roomCtrl
        },
        patch: {
            defaultError: "update the room",
            validation: roomVal,
            permission: roomPerm,
            ctrl: roomCtrl
        }
    }, sharedConfig],

    ["/:roomId/permissions", {
        get: {
            defaultError: "get your permissions for the room",
            ctrl: roomCtrl.binding.getPermissions
        }
    }, sharedConfig]

]);