const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const cch = require("./middleware/createControllerHandler");
const sde = require("./middleware/setDefaultError");

const {
    validate,
    resend
} = require("../controllers/emailValidation");

router.post( "/resend", isAuthenticated, sde("An error occured resending the email."), cch( resend ) );
router.post( "/:token", sde("An error occured validating the email."), cch( validate ) );

module.exports = router;