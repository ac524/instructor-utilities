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
        defaultError: "An error occured while trying to login.",
        middleware: loginValidation.postHandler(),
        ctrl: [ login, loginCtlrConfig ]
    }
} );

addRoutePath( router, "/authenticated", {
    post: {
        defaultError: "An error occured trying to get the authenticated user.",
        auth: true,
        ctrl: authenticated
    }
} );

module.exports = router;