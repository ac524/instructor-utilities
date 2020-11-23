const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

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

const entryCtlrConfig = {
    keyMap: { body: "entryData" }
};

module.exports = createRouter([

    ["/:feedId", {
        get: {
            defaultError: "get the feed",
            ctrl: getSingle
        }
    }, sharedConfig],

    ["/:feedId/items", {
        get: {
            defaultError: "get the feed items",
            ctrl: getSingleItems
        }
    }, sharedConfig],

    ...entryTypes.map( entryType => (
        [`/:feedId/${entryType.key}`, {
            post: {
                defaultError: `add the feed ${entryType.key} entry`,
                ctrl: [ entryType.getCreateRoute(), entryCtlrConfig ]
            }
        }, sharedConfig]
    ) )

]);