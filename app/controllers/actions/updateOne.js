/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 */

/**
 * @typedef UpdateModelOptions
 * @property {ObjectId} docId
 * @property {MongoDocument} doc
 * @property {Object} data
 * 
 * @param {MongoModel} DocModel 
 * @param {UpdateModelOptions} param1 
 * @returns {MongoDocument}
 */
const updateOne = async ( DocModel, { docId, doc, data } ) => {

    if( doc ) {

        await doc.update( data );
        return doc;

    }

    return await DocModel.findByIdAndUpdate( docId, data );

}

module.exports = updateOne;