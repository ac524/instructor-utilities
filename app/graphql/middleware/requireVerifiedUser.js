const { AuthenticationError } = require("apollo-server-express");

const requireVerifiedUser = ({
    context: { authUser }
}, next ) => {

    if( !authUser?.isVerified ) throw new AuthenticationError("User is not verified");

    return next();

}

module.exports = requireVerifiedUser;