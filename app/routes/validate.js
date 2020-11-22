const router = require("express").Router();

const {
    validate,
    resend
} = require("../controllers/emailValidation");
const addRoutePath = require("./utils/addRoutePath");

const resendCtlrConfig = {
    keyMap: { body: "config" }
};

addRoutePath( router, "/resend", {
    post: {
        auth: true,
        defaultError: "resend the email",
        ctrl: [ resend, resendCtlrConfig ]
    }
} );

addRoutePath( router, "/:token", {
    post: {
        defaultError: "validate the email",
        ctrl: validate
    }
} );

module.exports = router;