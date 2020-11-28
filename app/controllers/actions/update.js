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
 * 
 * @param {MongoModel} DocModel 
 * @param {UpdateModelOptions} param1 
 * @returns {MongoDocument}
 */
const update = async ( DocModel, { docId, doc, ...data } ) => {

    if( doc ) {

        await doc.update( data );
        return doc;

    }

    return await DocModel.findByIdAndUpdate( docId, data );

}

module.exports = update;