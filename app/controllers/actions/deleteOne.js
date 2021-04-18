const queryModifier = require("../utils/queryModifier");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 */

/**
 * @param {MongoModel} DocModel 
 * @param {ObjectId} docId
 * @returns {MongoDocument}
 */
const deleteOne = async ( DocModel, docId ) => {

    /** @type {MongoDocument} */
    const document = await DocModel.findByIdAndDelete( docId );

    // TODO Not found error

    return document;

}

module.exports = deleteOne;