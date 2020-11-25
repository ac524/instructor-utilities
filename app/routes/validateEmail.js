const createRouter = require("./utils/createRouter");

const {
    validate,
    resend
} = require("../controllers/validateEmail");
const resendValidation = require("../validation/resendValidation");

const resendCtlrConfig = {
    keyMap: { body: "config" }
};

module.exports = createRouter([

    ["/resend", {
        post: {
            auth: true,
            defaultError: "resend the email",
            validation: resendValidation,
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