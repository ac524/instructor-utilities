const createRouter = require("./utils/createRouter");

const { login: loginVal } = require("./validation")

const ctrls = require("../controllers");

const loginCtlrConfig = {
    keyMap: { body: "credentials" }
};

module.exports = createRouter([
	[
		"/login",
		{
			post: {
				defaultError: "login",
				validation: loginVal,
				ctrl: [ctrls.get("auth").binding.login, loginCtlrConfig]
			}
		}
	],

	[
		"/authenticated",
		{
			post: {
				defaultError: "get the authenticated user",
				auth: true,
				ctrl: ctrls.get("auth").binding.authenticated
			}
		}
	]
]);