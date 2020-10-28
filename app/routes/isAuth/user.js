const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    update,
    getRoomsShort,
    leaveRoom,
    archiveRoom
} = require("../../controllers/user");

router
    .route("/")
    .patch( update );

router
    .route("/rooms/:roomId/leave")
    .delete( setRoom.fromParam, isRoomMember, leaveRoom );

router
    .route("/rooms/:roomId/archive")
    .delete( setRoom.fromParam, isRoomMember, archiveRoom );

router
    .route("/rooms/short")
    .get( getRoomsShort );

module.exports = router;