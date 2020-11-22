const router = require("express").Router();

const registerValidation = require("../validation/registerValidation");

const cch = require("./middleware/createControllerHandler");
const sde = require("./middleware/setDefaultError");

const {
    register
} = require("../controllers/register");

router.post( "/", registerValidation.postHandler(), sde("An error occured during registration."), cch( register ) );

module.exports = router;