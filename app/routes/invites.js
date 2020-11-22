const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");
const setInvite = require("./middleware/setInvite");
const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const cch = require("./middleware/createControllerHandler");
const sde = require("./middleware/setDefaultError");
const gpv = require("./middleware/globalParamsValidation");

const {
    create,
    remove,
    accept,
    emailCheck,
    register
} = require("../controllers/invite");


router
    .route('/:roomId')
    .post(
        gpv,
        isAuthenticated,
        setRoom.fromParam,
        isRoomMember,
        sde("An error occured trying to create the invite."),
        cch( create )
    );

router
    .route('/:roomId/:inviteId')
    .delete(
        gpv,
        isAuthenticated,
        setRoom.fromParam,
        isRoomMember,
        sde("An error occured trying to delete the invite."),
        cch( remove )
    );

router
    .route('/:token/accept')
    .post(
        isAuthenticated,
        setInvite,
        cch( accept )
    );

router
    .route('/:token/email')
    .get(
        setInvite,
        sde("An error occured checking the email's status."),
        cch( emailCheck )
    );

router
    .route('/:token/register')
    .post(
        setInvite,
        sde("An error occured during registration."),
        cch( register )
    );

module.exports = router;