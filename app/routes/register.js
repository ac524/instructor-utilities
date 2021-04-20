const createRouter = require("./utils/createRouter");

const { register: registerVal } = require("./validation");

const { registerCtrl } = require("../controllers");


const registerCtlrConfig = {
    keyMap: { body: "registerData" }
};

module.exports = createRouter([

    ["/", {
        post: {
            defaultError: "complete the registration",
            validation: registerVal,
            ctrl: [ registerCtrl.binding.register, registerCtlrConfig ]
        }
    }]

]);