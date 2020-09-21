const passport = require("passport");

const setUserIo = ( req, res, next ) => {

    req.userIo = req.app.get("io").to(req.user._id);
    
    next();

}

module.exports = [
    passport.authenticate('jwt', { session: false }),
    setUserIo
];