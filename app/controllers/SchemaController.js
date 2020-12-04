const queryModifier = require("./utils/queryModifier");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * @typedef {import('./utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * TYPE DEFINITIONS FOR METHODS
 * 
 * SchemaController.createOne()
 * @typedef CreateDocOptions
 * @property {Object} data
 * 
 * @typedef CreateDocConfig
 * @property {Boolean} save
 * 
 * SchemaController.deleteOne()
 * @typedef DeleteDocOptions
 * @property {ObjectId} docId
 * @property {MongoDocument} doc
 * 
 * SchemaController.findOne()
 * @typedef FindDocOptions
 * @property {ObjectId} docId
 * @property {Object} search
 *
 * SchemaController.findMany()
 * @typedef FindDocsOptions
 * @property {Object} search
 * 
 * SchemaController.updateOne() 
 * @typedef UpdateDocOptions
 * @property {ObjectId} docId
 * @property {MongoDocument} doc
 * @property {Object} data
 *
 * SchemaController.updateMany() 
 * @typedef UpdateDocsOptions
 * @property {ObjectId} search
 * @property {ObjectId} data
 */

class SchemaController {

    /**
     * @param {string} key 
     * @param {MongoModel} model 
     */
    constructor( key, model ) {

        this.key = key;
        this.model = model;

    }

    callable( action ) {

        return this[action].bind(this);

    }

    /**
     * @param {Object} data
     * 
     * @returns {MongoDocument}
     */
    makeDoc( data ) {

        /** @type {MongoModel} */
        const DocModel = this.model;

        return new DocModel( data );

    }

    /**
     * @param {MongoModel} DocModel 
     * @param {CreateDocOptions} param0 
     * @param {CreateDocConfig} config
     * 
     * @returns {MongoDocument}
     */
    async createOne( { data }, config = { save: true } ) {

        /** @type {MongoDocument} */
        const document = this.makeDoc( data );
    
        if( config.save )
        
            await document.save();
    
        return document;

    }

    /**
     * @param {DeleteDocOptions} param0
     */
    async deleteOne( { docId, doc } ) {
    
        await this.model.deleteOne( doc ? doc._id : docId );

    }

    /**
     * @param {FindDocOptions} param0
     * 
     * @returns {MongoDocument}
     */
    async findOne( { docId, search } ) {

        /** @type {MongoDocument} */
        let document = docId
        
            // Fetch by id if provided.
            ? await this.model.findById( docId )
            
            // Otherwise expect search criteria.
            : await this.model.findOne( search );

        // TODO Not found error

        return document;

    }

    /**
     * @param {FindDocsOptions} param0 
     * @param {QueryModifierOptions} queryOptions
     * 
     * @returns {MongoDocument[]}
     */
    async findMany( { search }, queryOptions ) {
    
        /** @type {MongoDocument} */
        const documents = await queryModifier( this.model.find( search ), queryOptions );
    
        // TODO Not found error
    
        return documents;
    
    }

    /**
     * @param {UpdateDocOptions} param1 
     * @param {QueryModifierOptions} queryOptions
     * 
     * @returns {MongoDocument}
     */
    async updateOne( { docId, doc, search, data }, queryOptions ) {

        // If given the document's ID,
        if( docId )

            // Find it by ID, update it, and then return the updated document.
            return await queryModifier( this.model.findByIdAndUpdate( docId, data, { new: true } ), queryOptions );

        // If provided the target document,
        if( doc ) {

            // update and return.
            await doc.update( data );

            return doc;

        }

        // Otherwise, expect a search for the target doc.
        return queryModifier( this.model.findOneAndUpdate( search, data, { new: true } ), queryOptions );

    }

    /**
     * @param {MongoModel} DocModel 
     * @param {UpdateDocsOptions} param1 
     * @param {QueryModifierOptions} queryOptions 
     * @returns {MongoDocument}
     */
    async updateMany( { search, data }, queryOptions ) {

        return await queryModifier( this.model.updateMany( search, data, { new: true } ), queryOptions );

    }

}

module.exports = SchemaController;