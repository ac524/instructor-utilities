const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const {
    validate,
    resend
} = require("../controllers/emailValidation");

router.post( "/resend", isAuthenticated, validate );
router.post( "/:token", resend );

module.exports = router;