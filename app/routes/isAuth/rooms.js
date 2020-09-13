const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    // update,
    createInvite,
    deleteInvite
} = require("../../controllers/room");

router
    .route( "/:roomId" )
    .get( setRoom.fromParam, isRoomMember, getSingle )
    // .patch( setRoom.fromParam, isRoomMember, update );

router
    .route( "/:roomId/invites" )
    .post( setRoom.fromParam, isRoomMember, createInvite )

router
    .route( "/:roomId/invites/:inviteId" )
    .delete( setRoom.fromParam, isRoomMember, deleteInvite )

module.exports = router;