const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const { register: roomVal } = require("../config/validation");

const { room: roomPerm } = require("../config/permissions");

const {
    getSingle,
    getPermissions,
    update
} = require("../controllers/room");

const roomCtlrConfig = {
    keyMap: { body: "roomData" }
};

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
            ctrl: getSingle
        },
        patch: {
            defaultError: "update the room",
            validation: roomVal,
            permission: roomPerm,
            ctrl: [ update, roomCtlrConfig ]
        }
    }, sharedConfig],

    ["/:roomId/permissions", {
        get: {
            defaultError: "get your permissions for the room",
            ctrl: getPermissions
        }
    }, sharedConfig]

]);