const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const roomValidation = require("../validation/roomValidation");

const { room: roomPerm } = require("../config/permissions");

const {
    getSingle,
    update
} = require("../controllers/room");

const roomCtlrConfig = {
    keyMap: { body: "roomData" }
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
            validation: roomValidation,
            permission: roomPerm,
            ctrl: [ update, roomCtlrConfig ]
        }
    }, {
        auth: true,
        paramCheck: true,
        middleware: [ setRoom.fromParam, isRoomMember ],
    }]

]);