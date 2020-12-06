const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");
const ioEmit = require("./utils/ioEmit");

const tokenCtrl = require("./token");
const userCtrl = require("./user");

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

    const user = await userCtrl.findOne({ search: { email } });

    if( !user ) throw new NotFoundError( "Email not found." );

    await sendUserVerifyEmail( user );

}

/**
 * @typedef {Object} ValidateEmailOptions
 * @property {string} token
 * 
 * @param {ValidateEmailOptions} param0 
 */
const validate = async ({ tokenString }) => {

    const tokenRecord = await tokenCtrl.getByTokenString({ tokenString });

    if( !tokenRecord ) throw new NotFoundError( "Token not found." );

    const update = { isVerified: true };

    await userCtrl.updateOne({
        docId: tokenRecord.relation,
        data: update
    });

    ioEmit( "user:update", { isVerified:true }, `user:${tokenRecord.relation}` );

}

module.exports = {
    resend,
    validate
}