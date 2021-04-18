const { app: appVal } = require("./validation")

const { appCtrl } = require("../controllers");
const { appTypeCtrl } = require("../controllers");
const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");
const setAppSearch = require("./middleware/setAppSearch");

const createRouter = require("./utils/createRouter");

const sharedConfig = { auth: true };

module.exports = createRouter([

    ["/", {
        post: {
            defaultError: "create the app",
            validation: appVal,
            middleware: [ setRoom.fromBody, isRoomMember ],
            ctrl: appCtrl
        }
    }, sharedConfig],

    ["/types", {
        get: {
            defaultError: "get app types",
            ctrl: appTypeCtrl.binding.getEnabled
        }
    }, sharedConfig],

    ["/:appTypeId/:roomId", {
        get: {
            defaultError: "get the app",
            ctrl: appCtrl
        },
        patch: {
            defaultError: "update the app",
            ctrl: appCtrl
        }
    }, {
        ...sharedConfig,
        paramCheck: true,
        middleware: [ setRoom.fromParam, isRoomMember, setAppSearch ]
    }]

]);