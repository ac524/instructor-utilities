const router = require("express").Router();

const cch = require("./middleware/createControllerHandler");
const sde = require("./middleware/setDefaultError");

const {
    register
} = require("../controllers/register");

router.post( "/", sde("An error occured during registration."), cch( register ) );

module.exports = router;