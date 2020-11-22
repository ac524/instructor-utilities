const router = require("express").Router();

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const {
    create,
    getSingle,
    update,
    deleteSingle
} = require("../controllers/student");

const addRoutePath = require("./utils/addRoutePath");

const newAuthMiddleware = [ setRoom.fromBody, isRoomMember ];
const existingAuthMiddleware = [ setRoom.fromParam, isRoomMember ];

const studentCtlrConfig = {
    keyMap: { body: "studentData" }
}

addRoutePath( router, "/", {
    post: {
        auth: true,
        defaultError: "create the student",
        middleware: newAuthMiddleware,
        ctrl: [ create, studentCtlrConfig ]
    }
} );

addRoutePath( router, "/:roomId/:studentId", {
    get: {
        defaultError: "get the student",
        ctrl: getSingle
    },
    patch: {
        defaultError: "update the student",
        ctrl: [ update, studentCtlrConfig ]
    },
    delete: {
        defaultError: "delete the student",
        ctrl: deleteSingle
    }
 }, {
    auth: true,
    paramCheck: true,
    middleware: existingAuthMiddleware
} );

module.exports = router;