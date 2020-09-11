const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const {
    login,
    register,
    authenticated
} = require("../controllers/auth");

router.post( "/authenticated", isAuthenticated, authenticated );

router.post( "/register", register );
router.post( "/login", login );

module.exports = router;