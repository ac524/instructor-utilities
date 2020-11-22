const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const cch = require("../middleware/createControllerHandler");
// const sde = require("../middleware/setDefaultError");
const gpv = require("../middleware/globalParamsValidation");

const {
    getSingle,
    update
} = require("../../controllers/room");

const roomCtlrConfig = {
    keyMap: { body: "roomData" }
};

router
    .route( "/:roomId" )
    .get( gpv, setRoom.fromParam, isRoomMember, cch( getSingle ) )
    .patch( gpv, setRoom.fromParam, isRoomMember, cch( update, roomCtlrConfig ) );

module.exports = router;