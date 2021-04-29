const createRouter = require("./utils/createRouter");

const { resend: resendVal } = require("./validation");

const library = require("../controllers");

module.exports = createRouter([

    ["/resend", {
        post: {
            auth: true,
            unverified: true,
            defaultError: "resend the email",
            validation: resendVal,
            ctrl: library.get("validate.email").binding.resend
        }
    }],

    ["/:tokenString", {
        post: {
            defaultError: "validate the email",
            ctrl: library.get("validate.email").binding.validate
        }
    }]

]);