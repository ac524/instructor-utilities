const router = require("express").Router();

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const userValidation = require("../validation/userValidation");

const addRoutePath = require("./utils/addRoutePath");

const {
    update,
    getRoomsShort,
    leaveRoom,
    archiveRoom
} = require("../controllers/user");

const userCtlrConfig = {
    keyMap: { body: "userData" }
};

addRoutePath( router, "/", {
    patch: {
        auth: true,
        defaultError: "update the user",
        middleware: userValidation.patchHandler(),
        ctrl: [ update, userCtlrConfig ]
    }
} );

const sharedRoomActionsConfig = {
    paramCheck: true,
    middleware: [ setRoom.fromParam, isRoomMember ]
}

addRoutePath( router, "/rooms/:roomId/leave", {
    delete: {
        auth: true,
        defaultError: "leave the room",
        ctrl: leaveRoom
    }
}, sharedRoomActionsConfig );

addRoutePath( router, "/rooms/:roomId/leave", {
    delete: {
        auth: true,
        defaultError: "archive the room",
        ctrl: archiveRoom
    }
}, sharedRoomActionsConfig );

addRoutePath( router, "/rooms/short", {
    get: {
        auth: true,
        defaultError: "get short room details",
        ctrl: getRoomsShort
    }
});

module.exports = router;