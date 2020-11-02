const router = require("express").Router();

const setRoom = require("../middleware/setRoom");
const isRoomMember = require("../middleware/isRoomMember");

const {
    getSingle,
    getSingleItems,
    entryTypes
} = require("../../controllers/feed");

router
    .route( "/:feedId" )
    .get( setRoom.fromFeed, isRoomMember, getSingle );

router
    .route( "/:feedId/items" )
    .get( setRoom.fromFeed, isRoomMember, getSingleItems );

entryTypes.forEach( entryType => {

    router
        .route( `/:feedId/${entryType.key}` )
        .post( setRoom.fromFeed, isRoomMember, entryType.getCreateRoute() );

} );

module.exports = router;