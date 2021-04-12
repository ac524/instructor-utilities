const {
    feed: feedPerm,
    feedComment: feedCommentPerm,
    feedElevate: feedElevatePerm,
    feedDeelevate: feedDeelevatePerm
} = require("../config/permissions");

const feedCtrl = require("../controllers/feed");
const feedEntryCtrls = require("../controllers/feedentries");

const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");
const setFeed = require("./middleware/setFeed");
const isFeedEntryOwner = require("./middleware/isFeedEntryOwner");

const makeFeedEntryRoutesConfig = require("./utils/makeFeedEntryRoutesConfig");

const {
    feedEntry: feedEntryVal,
    comment: commentVal
} = require("./validation");

const sharedConfig = {
    paramCheck: true,
    auth: true,
    middleware: [ setFeed, setRoom.fromFeed, isRoomMember ]
}

const entryTypeConfigByAction = {
    comment: {
        validation: commentVal,
        permission: feedCommentPerm
    },
    elevate: {
        validation: feedEntryVal,
        permission: feedElevatePerm
    },
    deelevate: {
        validation: feedEntryVal,
        permission: feedDeelevatePerm
    }
}

module.exports = createRouter([

    ["/:feedId", {
        get: {
            defaultError: "get the feed",
            permission: feedPerm,
            ctrl: feedCtrl
        }
    }, sharedConfig],

    ["/:feedId/items", {
        get: {
            defaultError: "get the feed items",
            permission: feedPerm,
            ctrl: feedCtrl.binding.getItems
        }
    }, sharedConfig],

    ...Object
        .entries( feedEntryCtrls )
        .reduce((routes,[,entryTypeCtrl]) => [
            ...routes,
            ...makeFeedEntryRoutesConfig(entryTypeCtrl)
        ], [])
        // .map(([,entryTypeCtrl]) => (
        //     [`/${entryTypeCtrl.action} `, {
        //         post: {
        //             defaultError: `add the feed ${entryTypeCtrl.action} entry`,
        //             ctrl: entryTypeCtrl,
        //             ...(entryTypeConfigByAction[entryTypeCtrl.action] || {})
        //         }
        //     }, sharedConfig ],
        //     [`/${entryTypeCtrl.action}/:itemId`, {
        //         patch: {
        //             defaultError: `update the feed ${entryTypeCtrl.action} entry`,
        //             ctrl: entryTypeCtrl,
        //             permission: entryTypeConfigByAction[entryTypeCtrl.action].permission,
        //             middleware: [ setFeed, isFeedEntryOwner ]
        //         },
        //         delete: {
        //             defaultError: `delete the feed ${entryTypeCtrl.action} entry`,
        //             ctrl: entryTypeCtrl,
        //             permission: entryTypeConfigByAction[entryTypeCtrl.action].permission,
        //             middleware: [ setFeed, isFeedEntryOwner ]
        //         }
        //     }, sharedConfig ]
        // ))

]);