const router = require("express").Router();

const {
    login,
    register
} = require("../controllers/auth");

router.post( "/register", register );
router.post( "/login", login );

module.exports = router;