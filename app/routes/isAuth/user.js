const router = require("express").Router();

const {
    update,
    roomNames
} = require("../../controllers/user");

router
    .route("/")
    .patch( update );

router
    .route("/roomnames")
    .get( roomNames );

module.exports = router;