const createRouter = require("./utils/createRouter");

const { register: registerVal } = require("./validation");

const library = require("../controllers");


const registerCtlrConfig = {
    keyMap: { body: "registerData" }
};

module.exports = createRouter([

    ["/", {
        post: {
            defaultError: "complete the registration",
            validation: registerVal,
            ctrl: [ library.get("register").binding.register, registerCtlrConfig ]
        }
    }]

]);