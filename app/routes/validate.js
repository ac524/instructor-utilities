const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const {
    validate,
    resend
} = require("../controllers/emailValidation");

router.post( "/resend", isAuthenticated, resend );
router.post( "/:token", validate );

module.exports = router;