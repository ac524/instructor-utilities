const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    getSingleItems,
    createComment
} = require("../../controllers/feed");

router
    .route( "/:feedId" )
    .get( setRoom.fromFeed, isRoomMember, getSingle );

router
    .route( "/:feedId/items" )
    .get( setRoom.fromFeed, isRoomMember, getSingleItems );

router
    .route( "/:feedId/comments" )
    .post( setRoom.fromFeed, isRoomMember, createComment );

module.exports = router;