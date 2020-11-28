const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");
const ioEmit = require("./utils/ioEmit");

const { User } = require("../models");

const tokenCtrl = require("./token");

const { NotFoundError } = require("../config/errors");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('../config/validation/definitions/resendValidation').ResendData} ResendData
 */

/** CONTROLLER METHODS **/

/**
 * @typedef {Object} ResendValidateEmailOptions
 * @property {ResendData} config
 * 
 * @param {ResendValidateEmailOptions} param0
 */
const resend = async ({ config }) => {

    const { email } = config;

    const user = await User.findOne({ email });

    if( !user ) throw new NotFoundError( "Email not found." );

    await sendUserVerifyEmail( user );

}

/**
 * @typedef {Object} ValidateEmailOptions
 * @property {string} token
 * 
 * @param {ValidateEmailOptions} param0 
 */
const validate = async ({ token }) => {

    const tokenRecord = await tokenCtrl.findOne({ token });

    if( !tokenRecord ) throw new NotFoundError( "Token not found." );

    const update = { isVerified: true };

    await User.findByIdAndUpdate( tokenRecord.relation, update );

    ioEmit( "user:update", { isVerified:true }, `user:${tokenRecord.relation}` );

}

module.exports = {
    resend,
    validate
}