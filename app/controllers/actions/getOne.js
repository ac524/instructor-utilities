const queryModifier = require("../utils/queryModifier");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * @typedef {import('./utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * @param {MongoModel} DocModel 
 * @param {ObjectId} docId 
 * @param {QueryModifierOptions} options 
 * @returns {MongoDocument}
 */
const getOne = async ( DocModel, docId, options ) => {

    /** @type {MongoDocument} */
    const document = await queryModifier( DocModel.findById( docId ), options );

    // TODO Not found error

    return document;

}

module.exports = getOne;