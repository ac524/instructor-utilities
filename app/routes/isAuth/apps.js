const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getTypes,
    getSingle,
    create,
    update
} = require("../../controllers/app");

const cch = require("../middleware/createControllerHandler");
// const sde = require("../middleware/setDefaultError");

router
    .route( "/" )
    .post( setRoom.fromBody, isRoomMember, cch( create ) );
    // .get( setRoom.fromParam, isRoomMember, getSingle )
    // .patch( setRoom.fromParam, isRoomMember, update );

router
    .route( "/types" )
    .get( cch( getTypes ) );


router
    .route( "/:appTypeId/:roomId" )
    .post( setRoom.fromParam, isRoomMember, cch( getSingle ) )
    .patch( setRoom.fromParam, isRoomMember, cch( update ) )

module.exports = router;