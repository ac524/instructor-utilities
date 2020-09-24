const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    getSingleItems,
    createComment,
    createElevate,
    createDeelevate
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

router
    .route( "/:feedId/elevate" )
    .post( setRoom.fromFeed, isRoomMember, createElevate );

router
    .route( "/:feedId/deelevate" )
    .post( setRoom.fromFeed, isRoomMember, createDeelevate );

module.exports = router;