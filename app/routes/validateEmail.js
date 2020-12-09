const createRouter = require("./utils/createRouter");

const { resend: resendVal } = require("../config/validation");

const {
    validate,
    resend
} = require("../controllers/validateEmail");

const resendCtlrConfig = {
    keyMap: { body: "config" }
};

module.exports = createRouter([

    ["/resend", {
        post: {
            auth: true,
            defaultError: "resend the email",
            validation: resendVal,
            ctrl: [ resend, resendCtlrConfig ]
        }
    }],

    ["/:tokenString", {
        post: {
            defaultError: "validate the email",
            ctrl: validate
        }
    }]

]);