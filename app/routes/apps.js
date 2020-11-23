const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

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

module.exports = createRouter([

    ["/", {
        post: {
            defaultError: "create the app",
            middleware: [ setRoom.fromBody, isRoomMember ],
            ctrl: [ create, appCtlrConfig ]
        }
    }, sharedConfig],

    ["/types", {
        get: {
            defaultError: "get app types",
            ctrl: getTypes
        }
    }, sharedConfig],

    ["/:appTypeId/:roomId", {
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
    }]

]);