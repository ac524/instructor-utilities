const router = require("express").Router();

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const {
    getSingle,
    update
} = require("../controllers/room");
const addRoutePath = require("./utils/addRoutePath");

const roomCtlrConfig = {
    keyMap: { body: "roomData" }
};

addRoutePath( router, "/:roomId", {
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
} );

module.exports = router;