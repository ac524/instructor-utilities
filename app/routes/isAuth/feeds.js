const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    getSingleItems
} = require("../../controllers/feed");

router
    .route( "/:feedId" )
    .get( setRoom.fromFeed, isRoomMember, getSingle )

router
    .route( "/:feedId/items" )
    .get( setRoom.fromFeed, isRoomMember, getSingleItems )

module.exports = router;