const router = require("express").Router();

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const addRoutePath = require("./utils/addRoutePath");

const {
    getTypes,
    getSingle,
    create,
    update
} = require("../controllers/app");

const appCtlrConfig = {
    keyMap: { body: "appData" }
};

const sharedConfig = { auth: true };

addRoutePath( router, "/", {
    post: {
        defaultError: "create the app",
        middleware: [ setRoom.fromBody, isRoomMember ],
        ctrl: [ create, appCtlrConfig ]
    }
}, sharedConfig );

addRoutePath( router, "/types", {
    get: {
        defaultError: "get app types",
        ctrl: getTypes
    }
}, sharedConfig );

addRoutePath( router, "/:appTypeId/:roomId", {
    get: {
        defaultError: "get the app",
        ctrl: getSingle
    },
    patch: {
        defaultError: "update the app",
        ctrl: [update, appCtlrConfig]
    }
}, {
    ...sharedConfig,
    paramCheck: true,
    middleware: [ setRoom.fromParam, isRoomMember ]
} );

module.exports = router;