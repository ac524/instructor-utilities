const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    // update
} = require("../../controllers/room");

router
    .route( "/:roomId" )
    .get( setRoom.fromParam, isRoomMember, getSingle )
    // .patch( setRoom.fromParam, isRoomMember, update );

module.exports = router;