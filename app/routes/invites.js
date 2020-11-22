const router = require("express").Router();
const setInvite = require("./middleware/setInvite");
const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const addRoutePath = require("./utils/addRoutePath");

const {
    create,
    remove,
    accept,
    emailCheck,
    register
} = require("../controllers/invite");

const registerValidation = require("../validation/registerValidation");

const inviteCtlrConfig = {
    keyMap: { body: "inviteData" }
};

addRoutePath( router, "/:roomId", {
    post: {
        paramCheck: true,
        auth: true,
        defaultError: "create the invite",
        middleware: [ setRoom.fromParam, isRoomMember ],
        ctrl: [ create, inviteCtlrConfig ]
    }
} );

addRoutePath( router, "/:roomId/:inviteId", {
    delete: {
        paramCheck: true,
        auth: true,
        defaultError: "delete the invite",
        middleware: [ setRoom.fromParam, isRoomMember ],
        ctrl: remove
    }
} );

addRoutePath( router, "/:token/accept", {
    post: {
        auth: true,
        defaultError: "accept the invite",
        middleware: [ setInvite, ],
        ctrl: accept
    }
} );

addRoutePath( router, "/:token/email", {
    get: {
        defaultError: "check the email's status",
        middleware: setInvite,
        ctrl: emailCheck
    }
});

const inviteRegCtlrConfig = {
    keyMap: { body: "registerData" }
};

addRoutePath( router, "/:token/register", {
    post: {
        defaultError: "complete the registration",
        middleware: [ setInvite, registerValidation.postHandler(["name","password"]) ],
        ctrl: [ register, inviteRegCtlrConfig ]
    }
});

module.exports = router;