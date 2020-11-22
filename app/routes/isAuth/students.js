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
const gpv = require("../middleware/globalParamsValidation");

const newAuthMiddleware = [ setRoom.fromBody, isRoomMember ];
const existingAuthMiddleware = [ setRoom.fromParam, isRoomMember ];

const studentCtlrConfig = {
    keyMap: { body: "studentData" }
}

router
    .route( "/" )
    .post( newAuthMiddleware, sde("Unable to create student."), cch( create, studentCtlrConfig ) );

router
    .route( "/:roomId/:studentId" )
    .get( gpv, existingAuthMiddleware, sde("Unable to get student."), cch( getSingle ) )
    .patch( gpv, existingAuthMiddleware, sde("Unable to update student."), cch( update, studentCtlrConfig ) )
    .delete( gpv, existingAuthMiddleware, sde("Unable to delete student."), cch( deleteSingle ) );

module.exports = router;