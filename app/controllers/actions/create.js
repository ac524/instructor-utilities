/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 */

/**
 * 
 * @param {MongoModel} DocModel 
 * @param {Object} options 
 * @returns {MongoDocument}
 */
const create = async ( DocModel, options ) => {

    /** @type {MongoDocument} */
    const document = new DocModel( options );

    await document.save();

    return document;

}

module.exports = create;