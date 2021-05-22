const createRouter = require("./utils/createRouter");

const { register: registerVal } = require("./validation");

const ctrls = require("../controllers");


const registerCtlrConfig = {
    keyMap: { body: "registerData" }
};

module.exports = createRouter([

    ["/", {
        post: {
            defaultError: "complete the registration",
            validation: registerVal,
            ctrl: [ ctrls.get("register").binding.register, registerCtlrConfig ]
        }
    }]

]);