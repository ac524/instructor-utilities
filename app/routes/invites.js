const createRouter = require("./utils/createRouter");

const setInvite = require("./middleware/setInvite");
const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const userValidation = require("../validation/userValidation");

const { CREATE_INVITE, DELETE_INVITE } = require("../config/permissions");

const {
    create,
    remove,
    accept,
    emailCheck,
    register
} = require("../controllers/invite");
const inviteValidation = require("../validation/inviteValidation");

const inviteCtlrConfig = {
    keyMap: { body: "inviteData" }
};

const inviteRegCtlrConfig = {
    keyMap: { body: "registerData" }
};

module.exports = createRouter([

    ["/:roomId", {
        post: {
            paramCheck: true,
            auth: true,
            defaultError: "create the invite",
            validation: inviteValidation,
            permission: CREATE_INVITE,
            middleware: [ setRoom.fromParam, isRoomMember ],
            ctrl: [ create, inviteCtlrConfig ]
        }
    }],

    ["/:roomId/:inviteId", {
        delete: {
            paramCheck: true,
            auth: true,
            defaultError: "delete the invite",
            permission: DELETE_INVITE,
            middleware: [ setRoom.fromParam, isRoomMember ],
            ctrl: remove
        }
    }],

    ["/:token/accept", {
        post: {
            auth: true,
            defaultError: "accept the invite",
            middleware: [ setInvite, ],
            ctrl: accept
        }
    }],

    ["/:token/email", {
        get: {
            defaultError: "check the email's status",
            middleware: setInvite,
            ctrl: emailCheck
        }
    }],

    ["/:token/register", {
        post: {
            defaultError: "complete the registration",
            validation: userValidation.clone("invite", ["name","password"]),
            middleware: [ setInvite ],
            ctrl: [ register, inviteRegCtlrConfig ]
        }
    }],

]);