const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const cch = require("../middleware/createControllerHandler");
// const sde = require("../middleware/setDefaultError");

const {
    getSingle,
    update
} = require("../../controllers/room");

router
    .route( "/:roomId" )
    .get( setRoom.fromParam, isRoomMember, cch( getSingle ) )
    .patch( setRoom.fromParam, isRoomMember, cch( update, { include: ["roomStaffMember"] } ) );

module.exports = router;