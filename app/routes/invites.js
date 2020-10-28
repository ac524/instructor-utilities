const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");

const {
    accept,
    setInvite,
    emailCheck,
    registerInvite
} = require("../controllers/invite");

router
    .route('/:token')
    .post( isAuthenticated, setInvite, accept );

router
    .route('/:token/email')
    .get( setInvite, emailCheck );

router
    .route('/:token/register')
    .post( setInvite, registerInvite );

module.exports = router;