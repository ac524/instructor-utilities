const crypto = require('crypto');

const { Token } = require("../models");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../models/schema/TokenSchema').TokenDocument} TokenDocument
 * 
 * @typedef TokenData
 * @property {ObjectId} relation
 * @property {string} token
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
 * @param {TokenData} search 
 * @returns {TokenDocument}
 */
const findOne = async ( search ) => await Token.findOne( search );


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
    findOne,
    deleteOne
}