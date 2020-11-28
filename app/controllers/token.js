const { Token } = require("../models");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 */

/** CONTROLLER METHODS **/

/**
 * @typedef GetTokenByTokenOptions
 * @property {string} token
 * 
 * @param {GetTokenByTokenOptions} param0 
 */
const getOneByToken = async ({ token }) => await Token.findOne({ token });

module.exports = {
    getOneByToken
}