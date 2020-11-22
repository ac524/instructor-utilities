const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");
const ioEmit = require("./utils/ioEmit");

const { User, Token } = require("../models");
const { NotFoundError } = require("../config/errors");

/** CONTROLLER METHODS **/

/**
 * @param {object} param0 
 * @param {object} param0.config
 * @param {string} param0.config.email
 */
const resend = async ({ config }) => {

    const { email } = config;

    const user = await User.findOne({ email });

    if( !user ) throw new NotFoundError( "Email not found." );

    await sendUserVerifyEmail( user );

}

const validate = async ({ token }) => {

    const tokenRecord = await Token.findOne({ token });

    if( !tokenRecord ) throw new NotFoundError( "Token not found." );

    const update = { isVerified: true };

    await User.findByIdAndUpdate( tokenRecord.relation, update );

    ioEmit( "user:update", { isVerified:true }, `user:${tokenRecord.relation}` );

}

module.exports = {
    resend,
    validate
}