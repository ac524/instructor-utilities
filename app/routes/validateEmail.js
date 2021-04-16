const createRouter = require("./utils/createRouter");

const { resend: resendVal } = require("./validation");

const validateEmailCtrl = require("../controllers/validateEmail");

const resendCtlrConfig = {
    keyMap: { body: "config" }
};

module.exports = createRouter([

    ["/resend", {
        post: {
            auth: true,
            defaultError: "resend the email",
            validation: resendVal,
            ctrl: [ validateEmailCtrl.binding.resend, resendCtlrConfig ]
        }
    }],

    ["/:tokenString", {
        post: {
            defaultError: "validate the email",
            ctrl: validateEmailCtrl.binding.validate
        }
    }]

]);