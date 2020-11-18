const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    create,
    getSingle,
    update,
    deleteSingle
} = require("../../controllers/student");

const crh = require("../middleware/createControllerHandler");
const setDefaultError = require("../middleware/setDefaultError");

const newAuthMiddleware = [ setRoom.fromBody, isRoomMember ];
const existingAuthMiddleware = [ setRoom.fromParam, isRoomMember ];

router
    .route( "/" )
    .post( newAuthMiddleware, setDefaultError("Unable to create student"), crh( create ) );

router
    .route( "/:roomId/:studentId" )
    .get( existingAuthMiddleware, getSingle )
    .patch( existingAuthMiddleware, update )
    .delete( existingAuthMiddleware, deleteSingle );

module.exports = router;