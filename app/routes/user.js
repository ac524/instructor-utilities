const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const { user: userVal } = require("../config/validation");

const createRouter = require("./utils/createRouter");

const { room: roomPerm } = require("../config/permissions");

const {
    update,
    getRoomsShort,
    leaveRoom,
    archiveRoom
} = require("../controllers/user");

const userCtlrConfig = {
    keyMap: { body: "userData" }
};

const sharedRoomActionsConfig = {
    paramCheck: true,
    middleware: [ setRoom.fromParam, isRoomMember ]
}

module.exports = createRouter([

    ["/", {
        patch: {
            auth: true,
            defaultError: "update the user",
            validation: userVal,
            ctrl: [ update, userCtlrConfig ]
        }
    }],

    ["/rooms/:roomId/leave", {
        delete: {
            auth: true,
            defaultError: "leave the room",
            permission: roomPerm.leave,
            ctrl: leaveRoom
        }
    }, sharedRoomActionsConfig],

    ["/rooms/:roomId/archive", {
        delete: {
            auth: true,
            defaultError: "archive the room",
            permission: roomPerm.archive,
            ctrl: archiveRoom
        }
    }, sharedRoomActionsConfig],

    ["/rooms/short", {
        get: {
            auth: true,
            defaultError: "get short room details",
            ctrl: getRoomsShort
        }
    }]

]);