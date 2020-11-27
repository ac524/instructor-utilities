const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const { feed } = require("../config/permissions");

const {
    getSingle,
    getSingleItems,
    entryTypes
} = require("../controllers/feed");

const sharedConfig = {
    paramCheck: true,
    auth: true,
    middleware: [ setRoom.fromFeed, isRoomMember ]
}

module.exports = createRouter([

    ["/:feedId", {
        get: {
            defaultError: "get the feed",
            permission: feed,
            ctrl: getSingle
        }
    }, sharedConfig],

    ["/:feedId/items", {
        get: {
            defaultError: "get the feed items",
            permission: feed,
            ctrl: getSingleItems
        }
    }, sharedConfig],

    ...entryTypes.map( entryType => (
        [ ...entryType.getRouteConfig(), sharedConfig ]
    ) )

]);