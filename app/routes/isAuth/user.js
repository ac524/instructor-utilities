const router = require("express").Router();

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
    .delete( leaveRoom );

router
    .route("/rooms/:roomId/archive")
    .delete( archiveRoom );

router
    .route("/rooms/short")
    .get( getRoomsShort );

module.exports = router;