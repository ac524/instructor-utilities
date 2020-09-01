const router = require("express").Router();

const setReqRoomId = require("../middleware/setReqRoomId");
const isRoomMember = require("../middleware/isRoomMember");

const {
    update
} = require("../../controllers/student");

router
    .route( "/:studentId" )
    // .get( setReqRoomId.fromParam, isRoomMember, getSingle )
    .patch( setReqRoomId.fromStudent, isRoomMember, update );

module.exports = router;