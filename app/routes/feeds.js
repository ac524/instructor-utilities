const router = require("express").Router();

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const addRoutePath = require("./utils/addRoutePath");

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

addRoutePath( router, "/:feedId", {
    get: {
        defaultError: "get the feed",
        ctrl: getSingle
    }
}, sharedConfig );

addRoutePath( router, "/:feedId/items", {
    get: {
        defaultError: "get the feed items",
        ctrl: getSingleItems
    }
}, sharedConfig );

const entryCtlrConfig = {
    keyMap: { body: "entryData" }
};

entryTypes.forEach( entryType => {

    addRoutePath( router, `/:feedId/${entryType.key}`, {
        post: {
            defaultError: `add the feed ${entryType.key} entry`,
            ctrl: [ entryType.getCreateRoute(), entryCtlrConfig ]
        }
    }, sharedConfig );

} );

module.exports = router;