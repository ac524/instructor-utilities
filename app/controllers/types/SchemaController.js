const queryModifier = require("../utils/queryModifier");

const Controller = require("./Controller");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('mongoose').Model} MongoModel
 * @typedef {import('mongoose').Document} MongoDocument
 * @typedef {import('mongoose').DocumentQuery} DocumentQuery
 * @typedef {import('../utils/queryModifier').QueryModifierOptions} QueryModifierOptions
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
 * @property {Object} search
 * @property {Object} data
 * @property {Object} config
 *
 * SchemaController.updateMany() 
 * @typedef UpdateDocsOptions
 * @property {ObjectId} search
 * @property {ObjectId} data
 */

class SchemaController extends Controller {

    /** @type {QueryModifierOptions} */
    queryDefaults = {};

    /**
     * @param {string} key 
     * @param {MongoModel} model 
     */
    constructor( key, model, unique = "" ) {

        super( key + (unique && `-${unique}`) );

        this.key = key;
        this.model = model;

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
     * @param {DocumentQuery} query 
     * @param {QueryModifierOptions} modifier 
     */
    async query( query, modifiers ) {

        return queryModifier( query, {
            ...this.queryDefaults,
            ...modifiers
        } );

    }

    /**
     * @param {CreateDocOptions} param0 
     * @param {CreateDocConfig} param1
     * 
     * @returns {MongoDocument}
     */
    async createOne( { data }, { save = true } = {} ) {

        /** @type {MongoDocument} */
        const document = this.makeDoc( data );
    
        if( save )
        
            await document.save();
    
        return document;

    }

    /**
     * @param {DeleteDocOptions} param0
     */
    async deleteOne( { docId, doc } ) {
    
        await this.model.findByIdAndDelete( doc ? doc._id : docId );

    }

    /**
     * @param {FindDocOptions} param0
     * @param {QueryModifierOptions} queryOptions
     * 
     * @returns {MongoDocument}
     */
    async findOne( { docId, search }, queryOptions ) {

        /** @type {MongoDocument} */
        let document = await this.query(

            docId
        
                // Fetch by id if provided.
                ? this.model.findById( docId )
            
                // Otherwise expect search criteria.
                : this.model.findOne( search ),

            queryOptions

        );

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
        const documents = await this.query( this.model.find( search ), queryOptions );
    
        // TODO Not found error
    
        return documents;
    
    }

    /**
     * @param {UpdateDocOptions} param1 
     * @param {QueryModifierOptions} queryOptions
     * 
     * @returns {MongoDocument}
     */
    async updateOne( { docId, doc, search, data, config = {} }, queryOptions ) {

        // If provided the target document,
        if( doc ) {

            // update and return.
            await doc.update( data );

            return doc;

        }

        // If given the document's ID,
        if( docId )

            // Find it by ID, update it, and then return the updated document.
            return await this.query( this.model.findByIdAndUpdate( docId, data, { new: true, ...config } ), queryOptions );

        // Otherwise, expect a search for the target doc.
        return this.query( this.model.findOneAndUpdate( search, data, { new: true, ...config } ), queryOptions );

    }

    /**
     * @param {UpdateDocsOptions} param1 
     * @param {QueryModifierOptions} queryOptions 
     * @returns {MongoDocument}
     */
    async updateMany( { search, data }, queryOptions ) {

        return await this.query( this.model.updateMany( search, data, { new: true } ), queryOptions );

    }

}

module.exports = SchemaController;