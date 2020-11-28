const crypto = require('crypto');

const { Token } = require("../models");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../models/schema/TokenSchema').TokenDocument} TokenDocument
 * 
 * @typedef TokenData
 * @property
 */

/** CONTROLLER METHODS **/
/**
 * @typedef CreateTokenOptions
 * @property {ObjectId} relation
 * @property {string} tokenString
 * 
 * @typedef CreateTokenConfig
 * @property {number} bytes
 * 
 * @param {CreateTokenOptions} param0 
 * @param {CreateTokenConfig} param1
 * @returns {TokenDocument}
 */
const create = async ( { relation, tokenString }, { bytes = 16 } = {} ) => {

    const token = new Token({
        relation,
        token: tokenString || crypto.randomBytes(bytes).toString('hex')
    });

    await token.save();

    return token;

}

/**
 * @typedef GetTokenByTokenOptions
 * @property {string} token
 * 
 * @param {GetTokenByTokenOptions} param0 
 * @returns {TokenDocument}
 */
const getOneByToken = async ({ token }) => await Token.findOne({ token });


/**
 * @typedef DeleteTokenOptions
 * @property {ObjectId} tokenId
 * 
 * @param {DeleteTokenOptions} param0 
 */
const deleteOne = async ({ tokenId }) => {

    await Token.findByIdAndDelete( tokenId );

}

module.exports = {
    create,
    getOneByToken,
    deleteOne
}