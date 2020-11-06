const router = require("express").Router();

const {
    register
} = require("../controllers/register");

router.post( "/", register );

module.exports = router;