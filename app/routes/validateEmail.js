const createRouter = require("./utils/createRouter");

const { resend: resendVal } = require("./validation");

const validateEmailCtrl = require("../controllers/validateEmail");

module.exports = createRouter([

    ["/resend", {
        post: {
            auth: true,
            defaultError: "resend the email",
            validation: resendVal,
            ctrl: validateEmailCtrl.binding.resend
        }
    }],

    ["/:tokenString", {
        post: {
            defaultError: "validate the email",
            ctrl: validateEmailCtrl.binding.validate
        }
    }]

]);