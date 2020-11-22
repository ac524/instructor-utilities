const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const userValidation = require("../../validation/userValidation");

const cch = require("../middleware/createControllerHandler");
const sde = require("../middleware/setDefaultError");
const gpv = require("../middleware/globalParamsValidation");

const {
    update,
    getRoomsShort,
    leaveRoom,
    archiveRoom
} = require("../../controllers/user");

const userCtlrConfig = {
    keyMap: { body: "userData" }
};

router
    .route("/")
    .patch( userValidation.patchHandler(), sde("An error occured trying to update the user."), cch( update, userCtlrConfig ) );

router
    .route("/rooms/:roomId/leave")
    .delete( gpv, setRoom.fromParam, isRoomMember, sde("An error occured trying to leave the room."), cch( leaveRoom ) );

router
    .route("/rooms/:roomId/archive")
    .delete( gpv, setRoom.fromParam, isRoomMember, sde("An error occured trying to archive the room."), cch( archiveRoom ) );

router
    .route("/rooms/short")
    .get( sde("An error occured trying to get short room details."), cch( getRoomsShort ) );

module.exports = router;