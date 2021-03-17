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

const {
    comment: commentVal
} = require("./validation");

const sharedConfig = {
    paramCheck: true,
    auth: true,
    middleware: [ setRoom.fromFeed, isRoomMember ]
}

const entryTypeConfigByAction = {
    comment: {
        validation: commentVal,
        perm: feedCommentPerm
    },
    elevate: {
        perm: feedElevatePerm
    },
    deelevate: {
        perm: feedDeelevatePerm
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

    ...Object.entries( feedEntryCtrls ).map(([,entryTypeCtrl]) => (
        [`/:feedId/${entryTypeCtrl.action}`, {
            post: {
                defaultError: `add the feed ${entryTypeCtrl.action} entry`,
                ctrl: entryTypeCtrl,
                ctrlFilter: ([ ctrl, config ]) => [ctrl, {
                    ...config,
                    keyMap: {
                        ...config.keyMap,
                        user: "createdBy"
                    }
                }],
                ...(entryTypeConfigByAction[entryTypeCtrl.action] || {})
            }
        }, sharedConfig ]
    ))

]);