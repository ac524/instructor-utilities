const router = require("express").Router();

const {
    roomNames
} = require("../../controllers/user");

router
    .route("/roomnames")
    .get( roomNames );

module.exports = router;