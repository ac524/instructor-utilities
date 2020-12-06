const { feed } = require("../config/permissions");

const feedCtrl = require("../controllers/feed");

const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

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
            ctrl: feedCtrl
        }
    }, sharedConfig],

    ["/:feedId/items", {
        get: {
            defaultError: "get the feed items",
            permission: feed,
            ctrl: feedCtrl.binding.getItems
        }
    }, sharedConfig],

    ...feedCtrl.entryTypes.map( entryType => (
        [ ...entryType.getRouteConfig(), sharedConfig ]
    ) )

]);