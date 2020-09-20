const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    create,
    getSingle,
    update,
    deleteSingle
} = require("../../controllers/student");

const newAuthMiddleware = [ setRoom.fromBody, isRoomMember ];
const existingAuthMiddleware = [ setRoom.fromParam, isRoomMember ];

router
    .route( "/" )
    .post( newAuthMiddleware, create );

router
    .route( "/:roomId/:studentId" )
    .get( existingAuthMiddleware, getSingle )
    .patch( existingAuthMiddleware, update )
    .delete( existingAuthMiddleware, deleteSingle );

module.exports = router;