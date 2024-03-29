const createRouter = require("./utils/createRouter");

const setInvite = require("./middleware/setInvite");
const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const { user: userVal, invite: inviteVal } = require("./validation");

const { invite: invitePerm } = require("../config/permissions");

const ctrls = require("../controllers");

const inviteCtlrConfig = {
    keyMap: { body: "inviteData" }
};

const inviteRegCtlrConfig = {
    keyMap: { body: "registerData" }
};

module.exports = createRouter([
	[
		"/:roomId",
		{
			post: {
				paramCheck: true,
				auth: true,
				defaultError: "create the invite",
				validation: inviteVal,
				permission: invitePerm,
				middleware: [setRoom.fromParam, isRoomMember],
				ctrl: [ctrls.get("invite").binding.create, inviteCtlrConfig]
			}
		}
	],

	[
		"/:roomId/:inviteId",
		{
			delete: {
				paramCheck: true,
				auth: true,
				defaultError: "delete the invite",
				permission: invitePerm,
				middleware: [setRoom.fromParam, isRoomMember],
				ctrl: ctrls.get("invite").binding.remove
			}
		}
	],

	[
		"/:tokenString/accept",
		{
			post: {
				auth: true,
				defaultError: "accept the invite",
				middleware: [setInvite],
				ctrl: ctrls.get("invite").binding.accept
			}
		}
	],

	[
		"/:tokenString/email",
		{
			get: {
				defaultError: "check the email's status",
				middleware: setInvite,
				ctrl: ctrls.get("invite").binding.emailCheck
			}
		}
	],

	[
		"/:tokenString/register",
		{
			post: {
				defaultError: "complete the registration",
				validation: userVal.clone("invite", ["name", "password"]),
				middleware: [setInvite],
				ctrl: [
					ctrls.get("invite").binding.register,
					inviteRegCtlrConfig
				]
			}
		}
	]
]);