const queryModifier = require("../utils/queryModifier");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * @typedef {import('./utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * @typedef UpdateDocsOptions
 * @property {ObjectId} search
 * @property {ObjectId} data
 * 
 * @param {MongoModel} DocModel 
 * @param {UpdateDocsOptions} param1 
 * @param {QueryModifierOptions} queryOptions 
 * @returns {MongoDocument}
 */
const updateMany = async ( DocModel, { search, data }, queryOptions ) => {

    return await queryModifier( DocModel.updateMany( search, data, { new: true } ), queryOptions );

}

module.exports = updateMany;