const createRouter = require("./utils/createRouter");

const { resend: resendVal } = require("./validation");

const ctrls = require("../controllers");

module.exports = createRouter([

    ["/resend", {
        post: {
            auth: true,
            unverified: true,
            defaultError: "resend the email",
            validation: resendVal,
            ctrl: ctrls.get("validate.email").binding.resend
        }
    }],

    ["/:tokenString", {
        post: {
            defaultError: "validate the email",
            ctrl: ctrls.get("validate.email").binding.validate
        }
    }]

]);