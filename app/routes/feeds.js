const {
    feed: feedPerm
} = require("../config/permissions");

const library = require("../controllers");

const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");
const setFeed = require("./middleware/setFeed");

const makeFeedEntryRoutesConfig = require("./utils/makeFeedEntryRoutesConfig");
const searchCtrls = require("../controllers/utils/searchCtrls");

const sharedConfig = {
    paramCheck: true,
    auth: true,
    middleware: [ setFeed, setRoom.fromFeed, isRoomMember ]
}

module.exports = createRouter([
	[
		"/:feedId",
		{
			get: {
				defaultError: "get the feed",
				permission: feedPerm,
				ctrl: library.get("feed")
			}
		},
		sharedConfig
	],

	[
		"/:feedId/items",
		{
			get: {
				defaultError: "get the feed items",
				permission: feedPerm,
				ctrl: library.get("feed").binding.getItems
			}
		},
		sharedConfig
	],

	...[...searchCtrls("feed.item").entries()].reduce(
		(routes, [, entryTypeCtrl]) => [
			...routes,
			...makeFeedEntryRoutesConfig(entryTypeCtrl)
		],
		[]
	)
]);