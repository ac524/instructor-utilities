const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

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
            ctrl: getSingle
        },
        patch: {
            defaultError: "update the room",
            ctrl: [ update, roomCtlrConfig ]
        }
    }, {
        auth: true,
        paramCheck: true,
        middleware: [ setRoom.fromParam, isRoomMember ],
    }]

]);