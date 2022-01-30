const { AuthenticationError } = require("apollo-server-express");

const setAuthTokenUser = async ({
    context
}, next ) => {

    const {
        authTokenData,
        db
    } = context;

    if( !authTokenData?.id ) throw new AuthenticationError("Invalid Authorization");

    const docId = authTokenData?.id;

    try {
        
        context.authUser = await db.get('user').findOne({ docId }, { select: "name isVerified classrooms" });

        if( !context.authUser ) throw new AuthenticationError("Invalid Authorization");

    } catch( err ) {

        throw new AuthenticationError("Invalid Authorization");

    }

    return next();

}

const requireVerifiedUser = ({
    context: { authUser }
}, next ) => {

    if( !authUser?.isVerified ) throw new AuthenticationError("User is not verified");

    return next();

}

const useAuthentication = (verified = true) => [
    setAuthTokenUser,
    ...(verified ? [requireVerifiedUser] : [])
];

exports.setAuthTokenUser = setAuthTokenUser;
exports.requireVerifiedUser = requireVerifiedUser;
exports.useAuthentication = useAuthentication;