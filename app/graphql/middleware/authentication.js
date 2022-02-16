const { AuthenticationError } = require("apollo-server-express");

/**
 * @callback next
 *
 * @typedef {import('~crsm/graphql/context/authentication').AuthTokenContext & import('~crsm/graphql/context/db').DbContext} SetAuthTokenUserContext
 * 
 * @typedef AuthTokenUserContext
 * @property {import('~crsmmodels/schema/UserSchema').UserDocument} authUser
 * 
 * @param {Object} param0 
 * @param {SetAuthTokenUserContext} param0.context
 * @param {next} next 
 * @returns {*}
 */
const setAuthTokenUser = async ({
    context
}, next ) => {

    const {
        authTokenData,
        db
    } = context;

    if( !(authTokenData?.id) ) throw new AuthenticationError("Invalid Authorization");

    const docId = authTokenData?.id;

    try {
        
        context.authUser = await db.get('user').findOne({ docId }, { select: "name isVerified classrooms" });

    } catch( err ) {

        throw new AuthenticationError("Invalid Authorization");

    }

    if( !context.authUser ) throw new AuthenticationError("Invalid Authorization");

    return next();

}

/**
 * Throw an error if the user is not verified.
 * 
 * @param {Object} param0 
 * @param {AuthTokenUserContext} param0.context
 * @param {next} next 
 * @returns {*}
 */
const requireVerifiedUser = ({
    context: { authUser }
}, next ) => {

    if( !authUser?.isVerified ) throw new AuthenticationError("User is not verified");

    return next();

}

/**
 * 
 * @param {boolean} isVerified Flag for requiring that the user has been verified
 * @returns {Array} List of needed middleware for to authorize a user for a request
 */
const useAuthentication = (isVerified = true) => [
    setAuthTokenUser,
    ...(isVerified ? [requireVerifiedUser] : [])
];

exports.setAuthTokenUser = setAuthTokenUser;
exports.requireVerifiedUser = requireVerifiedUser;
exports.useAuthentication = useAuthentication;