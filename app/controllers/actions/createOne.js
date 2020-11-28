/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 */

/**
 * @typedef CreateDocOptions
 * @property {Boolean} save
 * 
 * @param {MongoModel} DocModel 
 * @param {Object} options 
 * @param {CreateDocOptions} config 
 * @returns {MongoDocument}
 */
const createOne = async ( DocModel, options, config = { save: true } ) => {

    /** @type {MongoDocument} */
    const document = new DocModel( options );

    if( config.save ) await document.save();

    return document;

}

module.exports = createOne;