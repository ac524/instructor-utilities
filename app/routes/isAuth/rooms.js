const router = require("express").Router();

const isRoomMember = require("../middleware/isRoomMember");

const {
    getRoom
} = require("../../controllers/roomController");

router
    .route( "/:roomId" )
    .get( isRoomMember, getRoom );

module.exports = router;