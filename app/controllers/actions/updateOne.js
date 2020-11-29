const queryModifier = require("./utils/queryModifier");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * @typedef {import('./utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * @typedef UpdateModelOptions
 * @property {ObjectId} docId
 * @property {MongoDocument} doc
 * @property {Object} data
 * 
 * @param {MongoModel} DocModel 
 * @param {UpdateModelOptions} param1 
 * @param {QueryModifierOptions} queryOptions 
 * @returns {MongoDocument}
 */
const updateOne = async ( DocModel, { docId, doc, search, data }, queryOptions ) => {

    if( doc ) {

        await doc.update( data );
        return doc;

    }

    if( search )

        return queryModifier( DocModel.findOneAndUpdate( search, data, { new: true } ), queryOptions );

    return await queryModifier( DocModel.findByIdAndUpdate( docId, data, { new: true } ), queryOptions );

}

module.exports = updateOne;