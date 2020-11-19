const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");
const ioEmit = require("./utils/ioEmit");

const { User, Token } = require("../models");
const { RouteError } = require("../config/errors/RouteError");

/** CONTROLLER METHODS **/

const resend = async ({ body }) => {

    const { email } = body;

    const user = await User.findOne({ email });

    if( !user ) throw new RouteError( 404, "Email not found." );

    await sendUserVerifyEmail( user );

}

const validate = async ({ token }) => {

    const tokenRecord = await Token.findOne({ token });

    if( !tokenRecord ) throw new RouteError( 404, "Token not found." );

    const update = { isVerified: true };

    await User.findByIdAndUpdate( tokenRecord.relation, update );

    ioEmit( "user:update", { isVerified:true }, `user:${tokenRecord.relation}` );

}

module.exports = {
    resend,
    validate
}