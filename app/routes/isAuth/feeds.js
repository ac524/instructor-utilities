const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const cch = require("../middleware/createControllerHandler");
const sde = require("../middleware/setDefaultError");
const gpv = require("../middleware/globalParamsValidation");

const {
    getSingle,
    getSingleItems,
    entryTypes
} = require("../../controllers/feed");

router
    .route( "/:feedId" )
    .get( gpv, setRoom.fromFeed, isRoomMember, sde("Unable to get feed."), cch( getSingle ) );

router
    .route( "/:feedId/items" )
    .get( gpv, setRoom.fromFeed, isRoomMember, sde("Unable to get feed items."), cch( getSingleItems ) );

entryTypes.forEach( entryType => {

    router
        .route( `/:feedId/${entryType.key}` )
        .post( gpv, setRoom.fromFeed, isRoomMember, cch( entryType.getCreateRoute() ) );

} );

module.exports = router;