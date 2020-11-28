const createRouter = require("./utils/createRouter");

const { register: registerVal } = require("../config/validation");

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
            validation: registerVal,
            ctrl: [ register, registerCtlrConfig ]
        }
    }]

]);