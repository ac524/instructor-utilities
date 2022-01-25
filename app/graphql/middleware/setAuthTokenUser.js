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
        
        context.authUser = await db.get('user').findOne({ docId }, { select: "isVerified classrooms" });

        if( !context.authUser ) throw new AuthenticationError("Invalid Authorization");

    } catch( err ) {

        throw new AuthenticationError("Invalid Authorization");

    }

    return next();

}

module.exports = setAuthTokenUser;