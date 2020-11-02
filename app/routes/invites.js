const router = require("express").Router();
const isAuthenticated = require("./middleware/isAuthenticated");
const setInvite = require("./middleware/setInvite");

const {
    accept,
    emailCheck,
    register
} = require("../controllers/invite");

router
    .route('/:token')
    .post( isAuthenticated, setInvite, accept );

router
    .route('/:token/email')
    .get( setInvite, emailCheck );

router
    .route('/:token/register')
    .post( setInvite, register );

module.exports = router;