const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const crh = require("./middleware/createControllerHandler");
const sde = require("./middleware/setDefaultError");

const {
    login,
    authenticated
} = require("../controllers/auth");

router.post( "/authenticated", isAuthenticated, crh( authenticated ) );

router.post( "/login", sde("An error occured while trying to login."), crh( login ) );

module.exports = router;