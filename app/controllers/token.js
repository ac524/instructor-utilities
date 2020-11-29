const crypto = require('crypto');

const actions = require("./actions");

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
 * @typedef CreateTokenConfig
 * @property {number} bytes
 * 
 * @param {TokenData} param0 
 * @param {CreateTokenConfig} param1
 * @returns {TokenDocument}
 */
const create = async ( { relation, token: tokenString }, { bytes = 16 } = {} ) => await actions.createOne( Token, {
    relation,
    token: tokenString || crypto.randomBytes(bytes).toString('hex')
} );

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