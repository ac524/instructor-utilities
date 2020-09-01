const router = require("express").Router();

const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    update
} = require("../../controllers/room");

router
    .route( "/:roomId" )
    .get( isRoomMember, getSingle )
    .patch( isRoomMember, update );

module.exports = router;