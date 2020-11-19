const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    create,
    getSingle,
    update,
    deleteSingle
} = require("../../controllers/student");

const cch = require("../middleware/createControllerHandler");
const sde = require("../middleware/setDefaultError");

const newAuthMiddleware = [ setRoom.fromBody, isRoomMember ];
const existingAuthMiddleware = [ setRoom.fromParam, isRoomMember ];

router
    .route( "/" )
    .post( newAuthMiddleware, sde("Unable to create student."), cch( create, { include: ["roomId"] } ) );

router
    .route( "/:roomId/:studentId" )
    .get( existingAuthMiddleware, sde("Unable to get student."), cch( getSingle ) )
    .patch( existingAuthMiddleware, sde("Unable to update student."), cch( update ) )
    .delete( existingAuthMiddleware, sde("Unable to delete student."), cch( deleteSingle ) );

module.exports = router;