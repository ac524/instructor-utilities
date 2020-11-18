const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const cch = require("./middleware/createControllerHandler");
const sde = require("./middleware/setDefaultError");

const {
    login,
    authenticated
} = require("../controllers/auth");

router.post( "/authenticated", isAuthenticated, cch( authenticated ) );

router.post( "/login", sde("An error occured while trying to login."), cch( login ) );

module.exports = router;