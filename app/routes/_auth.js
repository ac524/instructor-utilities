const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const cch = require("./middleware/createControllerHandler");
const sde = require("./middleware/setDefaultError");

const {
    login,
    authenticated
} = require("../controllers/auth");

const loginValidation = require("../validation/loginValidation");

router.post(
    "/login",
    sde("An error occured while trying to login."),
    loginValidation.postHandler(),
    cch( login )
);

router.post( "/authenticated", isAuthenticated, cch( authenticated ) );

module.exports = router;