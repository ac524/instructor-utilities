const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const cch = require("../middleware/createControllerHandler");
const sde = require("../middleware/setDefaultError");

const {
    update,
    getRoomsShort,
    leaveRoom,
    archiveRoom
} = require("../../controllers/user");

router
    .route("/")
    .patch( sde("An error occured trying to update the user."), cch( update ) );

router
    .route("/rooms/:roomId/leave")
    .delete( setRoom.fromParam, isRoomMember, sde("An error occured trying to leave the room."), cch( leaveRoom ) );

router
    .route("/rooms/:roomId/archive")
    .delete( setRoom.fromParam, isRoomMember, sde("An error occured trying to archive the room."), cch( archiveRoom ) );

router
    .route("/rooms/short")
    .get( sde("An error occured trying to get short room details."), cch( getRoomsShort ) );

module.exports = router;