const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    // getSingle,
    create
} = require("../../controllers/app");

router
    .route( "/" )
    .post( setRoom.fromBody, isRoomMember, create )
    // .get( setRoom.fromParam, isRoomMember, getSingle )
    // .patch( setRoom.fromParam, isRoomMember, update );

module.exports = router;