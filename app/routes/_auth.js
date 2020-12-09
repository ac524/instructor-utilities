const createRouter = require("./utils/createRouter");

const { login: loginVal } = require("../config/validation")

const {
    login,
    authenticated
} = require("../controllers/auth");

const loginCtlrConfig = {
    keyMap: { body: "credentials" }
};

module.exports = createRouter([

    ["/login", {
        post: {
            defaultError: "login",
            validation: loginVal,
            ctrl: [ login, loginCtlrConfig ]
        }
    }],

    ["/authenticated", {
        post: {
            defaultError: "get the authenticated user",
            auth: true,
            ctrl: authenticated
        }
    }]

]);