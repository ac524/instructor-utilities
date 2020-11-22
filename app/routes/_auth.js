const router = require("express").Router();

const addRoutePath = require("./utils/addRoutePath");

const {
    login,
    authenticated
} = require("../controllers/auth");

const loginValidation = require("../validation/loginValidation");

const loginCtlrConfig = {
    keyMap: { body: "credentials" }
};

addRoutePath( router, "/login", {
    post: {
        defaultError: "login",
        middleware: loginValidation.postHandler(),
        ctrl: [ login, loginCtlrConfig ]
    }
} );

addRoutePath( router, "/authenticated", {
    post: {
        defaultError: "get the authenticated user",
        auth: true,
        ctrl: authenticated
    }
} );

module.exports = router;