const createRouter = require("./utils/createRouter");

const {
    login,
    authenticated
} = require("../controllers/auth");

const loginValidation = require("../validation/loginValidation");

const loginCtlrConfig = {
    keyMap: { body: "credentials" }
};

module.exports = createRouter([

    ["/login", {
        post: {
            defaultError: "login",
            middleware: loginValidation.postHandler(),
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