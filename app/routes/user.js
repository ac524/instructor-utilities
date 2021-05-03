const ctrls = require("../controllers");

const { user: userVal } = require("./validation");
const { room: roomPerm } = require("../config/permissions");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const createRouter = require("./utils/createRouter");

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
            ctrl: ctrls.get("user")
        }
    }],

    ["/rooms/:roomId/leave", {
        delete: {
            auth: true,
            defaultError: "leave the room",
            permission: roomPerm.leave,
            ctrl: ctrls.get("user").binding.leaveRoom
        }
    }, sharedRoomActionsConfig],

    ["/rooms/:roomId/archive", {
        delete: {
            auth: true,
            defaultError: "archive the room",
            permission: roomPerm.archive,
            ctrl: ctrls.get("user").binding.archiveRoom
        }
    }, sharedRoomActionsConfig],

    ["/rooms/short", {
        get: {
            auth: true,
            defaultError: "get short room details",
            ctrl: ctrls.get("user").binding.getRoomsBasics
        }
    }]

]);