const {
    feedComment: feedCommentPerm,
    feedElevate: feedElevatePerm,
    feedDeelevate: feedDeelevatePerm
} = require("../../config/permissions");

const {
    feedEntry: feedEntryVal,
    comment: commentVal
} = require("../validation");

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");
const setFeed = require("../middleware/setFeed");
const isFeedEntryOwner = require("../middleware/isFeedEntryOwner");

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

const makeModificationRoutes = (feedEntryCtrl, permission, validation) => {

    const routesList = [];

    if( permission.types.has("update") )

        routesList.push(["patch",{
            defaultError: `update the feed ${feedEntryCtrl.action} entry`,
        }]);

    if( permission.types.has("delete") )

        routesList.push(["delete",{
            defaultError: `delete the feed ${feedEntryCtrl.action} entry`,
        }]);

    if( !routesList.length ) return [];

    return [
        [ `/${feedEntryCtrl.action}/:itemId`, {
            ...Object.fromEntries(routesList)
        }, {
            paramCheck: true,
            auth: true,
            ctrl: feedEntryCtrl,
            permission,
            middleware: [ setFeed,  setRoom.fromFeed, isRoomMember, isFeedEntryOwner ]
        }]
    ]

}

const makeFeedEntryRoutesConfig = ( feedEntryCtrl ) => {

    const {
        validation,
        permission
    } = (entryTypeConfigByAction[feedEntryCtrl.action] || {});

    const routes = [
        [`/${feedEntryCtrl.action}`, {
            post: {
                auth: true,
                defaultError: `add the feed ${feedEntryCtrl.action} entry`,
                ctrl: feedEntryCtrl,
                validation,
                permission,
                middleware: [ setFeed,  setRoom.fromFeed, isRoomMember ]
            }
        } ],
        ...(
            permission
                ? makeModificationRoutes(feedEntryCtrl,permission,validation)
                : []
        )
    ];

    return routes;

}

module.exports = makeFeedEntryRoutesConfig;