/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 */

/**
 * @param {MongoModel} DocModel 
 * @param {Object} search 
 * @returns {MongoDocument}
 */
const findOne = async ( DocModel, search ) => {

    /** @type {MongoDocument} */
    const document = await DocModel.findOne( search );

    // TODO Not found error

    return document;

}

module.exports = findOne;