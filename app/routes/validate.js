const createRouter = require("./utils/createRouter");

const {
    validate,
    resend
} = require("../controllers/emailValidation");

const resendCtlrConfig = {
    keyMap: { body: "config" }
};

module.exports = createRouter([

    ["/resend", {
        post: {
            auth: true,
            defaultError: "resend the email",
            ctrl: [ resend, resendCtlrConfig ]
        }
    }],

    ["/:token", {
        post: {
            defaultError: "validate the email",
            ctrl: validate
        }
    }]

]);