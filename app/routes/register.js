const router = require("express").Router();

const registerValidation = require("../validation/registerValidation");

const {
    register
} = require("../controllers/register");
const addRoutePath = require("./utils/addRoutePath");

const registerCtlrConfig = {
    keyMap: { body: "registerData" }
};

addRoutePath( router, "/", {
    post: {
        defaultError: "complete the registration",
        middleware: [ registerValidation.postHandler() ],
        ctrl: [ register, registerCtlrConfig ]
    }
} );

module.exports = router;