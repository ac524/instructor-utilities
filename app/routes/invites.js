const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");
const setInvite = require("./middleware/setInvite");
const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const {
    create,
    remove,
    accept,
    emailCheck,
    register
} = require("../controllers/invite");


router
    .route('/:roomId')
    .post( isAuthenticated, setRoom.fromParam, isRoomMember, create );

router
    .route('/:roomId/:inviteId')
    .delete( isAuthenticated, setRoom.fromParam, isRoomMember, remove );

router
    .route('/:token/accept')
    .post( isAuthenticated, setInvite, accept );

router
    .route('/:token/email')
    .get( setInvite, emailCheck );

router
    .route('/:token/register')
    .post( setInvite, register );

module.exports = router;