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
const gpv = require("../middleware/globalParamsValidation");

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
    .post( gpv, setRoom.fromParam, isRoomMember, cch( getSingle ) )
    .patch( gpv, setRoom.fromParam, isRoomMember, cch( update ) )

module.exports = router;