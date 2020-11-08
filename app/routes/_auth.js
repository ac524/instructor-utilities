const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const {
    login,
    authenticated
} = require("../controllers/auth");

router.post( "/authenticated", isAuthenticated, authenticated );

router.post( "/login", login );

module.exports = router;