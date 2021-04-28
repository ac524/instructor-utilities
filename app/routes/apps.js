const { app: appVal } = require("./validation")

const library = require("../controllers");
//const { appTypeCtrl } = require("../controllers");
const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");
const setAppSearch = require("./middleware/setAppSearch");

const createRouter = require("./utils/createRouter");

const sharedConfig = { auth: true };

module.exports = createRouter([
	[
		"/",
		{
			post: {
				defaultError: "create the app",
				validation: appVal,
				middleware: [setRoom.fromBody, isRoomMember],
				ctrl: library.get("app")
			}
		},
		sharedConfig
	],

	[
		"/types",
		{
			get: {
				defaultError: "get app types",
				ctrl: library.get("appType").binding.getEnabled
			}
		},
		sharedConfig
	],

	[
		"/:appTypeId/:roomId",
		{
			get: {
				defaultError: "get the app",
				ctrl: library.get("app")
			},
			patch: {
				defaultError: "update the app",
				ctrl: library.get("app")
			}
		},
		{
			...sharedConfig,
			paramCheck: true,
			middleware: [setRoom.fromParam, isRoomMember, setAppSearch]
		}
	]
]);