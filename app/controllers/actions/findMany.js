const queryModifier = require("./utils/queryModifier");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * @typedef {import('./utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * @param {MongoModel} DocModel 
 * @param {Object} search 
 * @param {Object} queryOptions 
 * @returns {MongoDocument[]}
 */
const findMany = async ( DocModel, { search }, queryOptions ) => {

    /** @type {MongoDocument} */
    const documents = await queryModifier( DocModel.find( search ), queryOptions );

    // TODO Not found error

    return documents;

}

module.exports = findMany;