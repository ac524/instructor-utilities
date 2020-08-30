const router = require("express").Router();

const { authenticated } = require("../../controllers/authController");

router.post( "/authenticated", authenticated );

module.exports = router;