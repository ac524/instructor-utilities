const crypto = require('crypto');

const { Token } = require("../../models");

const SchemaController = require("../types/SchemaController");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * 
 * @typedef {import('../types/SchemaController').CreateDocOptions} CreateDocOptions
 * @typedef {import('../types/SchemaController').CreateDocConfig} CreateDocConfig
 * 
 * @typedef {import('../utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * TYPE DEFINITIONS FOR METHODS
 * 
 * TokenController.creatOne()
 * @typedef CreateTokenConfigData
 * @property {number} bytes
 * 
 * @typedef {CreateDocConfig & CreateTokenConfigData} CreateTokenConfig
 * 
 * TokenController.getByTokenString
 * @typedef GetTokenByStringOptions
 * @property {string} tokenString
 */

class TokenController extends SchemaController {

    constructor() {

        super( 'token', Token );

    }

    /**
     * @param {CreateDocOptions} param0 
     * @param {CreateTokenConfig} param1
     * 
     * @returns {MongoDocument}
     */
    async createOne( { data: { tokenString, ...data } }, { bytes = 16, ...config } = {} ) {

        return super.createOne({
            data: {
                ...data,
                // Use the provided string or generate one based on the config.
                tokenString: tokenString || crypto.randomBytes(bytes).toString('hex')
            }
        }, config);

    }

    /**
     * @param {GetTokenByStringOptions} param0
     * @param {QueryModifierOptions} queryOptions
     * 
     * @returns {MongoDocument}
     */
    async getByTokenString( { tokenString }, queryOptions ) {

        return this.findOne( {
            search: {
                tokenString
            }
        }, queryOptions );

    }

}

module.exports = TokenController;