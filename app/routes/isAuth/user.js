const router = require("express").Router();

const {
    update,
    getRoomsShort
} = require("../../controllers/user");

router
    .route("/")
    .patch( update );

router
    .route("/roomsshort")
    .get( getRoomsShort );

module.exports = router;