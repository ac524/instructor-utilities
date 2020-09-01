const router = require("express").Router();

const { authenticated } = require("../../controllers/auth");

router.post( "/authenticated", authenticated );

module.exports = router;