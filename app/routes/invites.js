const router = require("express").Router();

const {
    accept,
    setInvite,
    emailCheck
} = require("../controllers/invite");

router
    .route('/:token')
    .post( setInvite, accept );

router
    .route('/:token/email')
    .get( setInvite, emailCheck );

module.exports = router;