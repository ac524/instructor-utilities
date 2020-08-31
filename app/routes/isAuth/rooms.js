const router = require("express").Router();

const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    update
} = require("../../controllers/roomController");

router
    .route( "/:roomId" )
    .get( isRoomMember, getSingle )
    .patch( isRoomMember, update );

module.exports = router;