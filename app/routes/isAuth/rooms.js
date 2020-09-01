const router = require("express").Router();

const setReqRoomId = require("../middleware/setReqRoomId");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    update
} = require("../../controllers/room");

router
    .route( "/:roomId" )
    .get( setReqRoomId.fromParam, isRoomMember, getSingle )
    .patch( setReqRoomId.fromParam, isRoomMember, update );

module.exports = router;