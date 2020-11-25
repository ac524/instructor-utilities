const createRouter = require("./utils/createRouter");

const registerValidation = require("../validation/registerValidation");

const {
    register
} = require("../controllers/register");


const registerCtlrConfig = {
    keyMap: { body: "registerData" }
};

module.exports = createRouter([

    ["/", {
        post: {
            defaultError: "complete the registration",
            validation: registerValidation,
            ctrl: [ register, registerCtlrConfig ]
        }
    }]

]);