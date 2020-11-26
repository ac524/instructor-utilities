const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const {
    getSingle,
    getSingleItems,
    entryTypes
} = require("../controllers/feed");
const { VIEW_FEED } = require("../config/permissions");

const sharedConfig = {
    paramCheck: true,
    auth: true,
    middleware: [ setRoom.fromFeed, isRoomMember ]
}

module.exports = createRouter([

    ["/:feedId", {
        get: {
            defaultError: "get the feed",
            permission: VIEW_FEED,
            ctrl: getSingle
        }
    }, sharedConfig],

    ["/:feedId/items", {
        get: {
            defaultError: "get the feed items",
            permission: VIEW_FEED,
            ctrl: getSingleItems
        }
    }, sharedConfig],

    ...entryTypes.map( entryType => (
        [ ...entryType.getRouteConfig(), sharedConfig ]
    ) )

]);