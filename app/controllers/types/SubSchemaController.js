const { InvalidDataError } = require("../../config/errors");
const { populate } = require("../definitions/models/Feed");

const Controller = require("./Controller");
const SchemaController = require("./SchemaController");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('mongoose').Schema.Types.ObjectId} ObjectId
 * @typedef {import('../utils/queryModifier').QueryModifierOptions} QueryModifierOptions
 */

/**
 * TYPE DEFINITIONS FOR METHODS
 * 
 * SubSchemaController.createOne()
 * @typedef CreateSubDocOptions
 * @property {ObjectId} belongsTo - Owner document ID to insert into.
 * @property {Object} data - Data to apply to the sub document.
 * 
 * SubSchemaController.findOwner()
 * @typedef FindSubDocOwnerOptions
 * @property {ObjectId} docId - Sub document id.
 * 
 * SubSchemaController.findOne()
 * @typedef FindSubDocOptions
 * @property {ObjectId} docId - Sub document id.
 * 
 * SubSchemaController.updateOne()
 * @typedef UpdateSubDocOptions
 * @property {ObjectId} docId - Sub document id.
 * @property {Object} data - Data to apply to the sub document.
 * 
 * SubSchemaController.deleteOne()
 * @typedef DeleteSubDocOptions
 * @property {ObjectId} docId - Sub document id.
 * 
 */

class SubSchemaController extends Controller {

    /** @type {string} */
    key;

    /** @type {string} */
    prop;

    /** @type {SchemaController} */
    ctrl;

    /**
     * @param {string} key;
     * @param {SchemaController} ctrl 
     */
    constructor( key, ctrl, unique = "" ) {

        super( `${ctrl.key}-${key}` + (unique && `-${unique}`) );

        this.key = key;
        this.prop = key+"s";
        this.ctrl = ctrl;

    }

    /**
     * @param {Object} data - Sub doc data.
     * @returns {Object} - Sub doc data mapped to mongo query potential keys.
     */
    mapSubDocKeys( data ) {

        return Object.keys( data )
            .reduce( (newMap,dataKey) => ({
                ...newMap,
                [`${this.prop}.$.${dataKey}`]: data[dataKey]
            }), {} );

    }

    /**
     * @param {CreateSubDocOptions} param0
     * @param {QueryModifierOptions} queryOptions
     * @returns {Object}
     */
    async findOwner( { docId }, queryOptions ) {

        return await this.ctrl.findOne({
            search: { [`${this.prop}._id`]: docId }
        }, queryOptions);

    }

    /**
     * @param {CreateSubDocOptions} param0
     * @returns {Object}
     */
    async createOne( { belongsTo, data }, queryOptions ) {

        if( !belongsTo ) throw new InvalidDataError("`belongsTo` is required when creating new sub documents");

        return (

            // Make the query.
            await this.ctrl.updateOne({
                docId: belongsTo,
                data: { $push: { [this.prop]: data } }
            }, {
                // Get our new subdoc by slicing the new last item in the list.
                select: { [this.prop]: { $slice: -1 } }
            }, queryOptions)
        
        // Select the new subdoc to return.
        )[this.prop][0];

    }

    /**
     * @param {FindSubDocOptions} param0 
     * @returns {Object}
     */
    async findOne( { docId } ) {

        return (

            // Find and select the target subdoc.
            await this.ctrl.findOne({
                search: { [`${this.prop}._id`]: docId }
            }, {
                // Select the potential matching document.
                select: `${this.prop}.$`,
                populate: false
            })

        // Select the target subdoc to return.
        )[this.prop].id( docId );

    }

    /**
     * @param {UpdateSubDocOptions} param0
     * @returns {Object}
     */
    async updateOne( { docId, data } ) {

        return (

            // Find and update the target subdoc.
            await this.ctrl.updateOne({
                search: { [`${this.prop}._id`]: docId },
                data: this.mapSubDocKeys( data, true )
            }, {
                // Select the subdoc list - TODO figure out how to not have to select the entire sub doc list here. The "potential" flag ".$" doesn't work with the { new: true } flag on the mongoose query.
                select: this.prop
            })

        // Select the target subdoc to return.
        )[this.prop].id(docId);

    }

    /**
     * @param {DeleteSubDocOptions} param0
     * @returns {Object}
     */
    async deleteOne({ docId }) {

        // Make the query.
        return (

            // Find and update the target subdoc.
            await this.ctrl.updateOne({
                search: { [`${this.prop}._id`]: docId },
                data: { $pull: { [`${this.prop}`]: { "_id": docId } } },
                // Return the old document so we can extract the deleted student.
                config: { new: false }
            }, {
                // Get our new subdoc by slicing the new last item in the list.
                select: this.prop
            })

        )[this.prop].id(docId);

    }

}

module.exports = SubSchemaController;