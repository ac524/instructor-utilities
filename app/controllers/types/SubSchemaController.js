const { InvalidDataError } = require("~crsm/config/errors");
const { findOne } = require("../../models/App");
const Controller = require("./Controller");
const SchemaController = require("./SchemaController");

class SubSchemaController extends Controller {

    /** @type {string} */
    key;

    /** @type {SchemaController} */
    ctrl;

    /**
     * @param {SchemaController} ctrl 
     */
    constructor( key, ctrl ) {

        super();

        this.key = key;
        this.prop = key+"s";
        this.ctrl = ctrl;

    }

    get ctrlKey() {

        return this.ctrl.key + this.key[0].toUpperCase() + this.key.slice(1);

    }

    mapSubDocKeys( data ) {

        return Object.keys( data )
            .reduce( (newMap,dataKey) => ({
                ...newMap,
                [`${this.prop}.$.${dataKey}`]: data[dataKey]
            }), {} );

    }

    async createOne( { belongsTo, data } ) {

        if( !belongsTo ) throw new InvalidDataError("`belongsTo` is required when creating new sub documents");

        return (

            // Make the query.
            await this.ctrl.updateOne({
                docId: belongsTo,
                data: { $push: { [this.prop]: data } }
            }, {
                // Get our new subdoc by slicing the new last item in the list.
                select: { [this.prop]: { $slice: -1 } }
            })
        
        // Select the new subdoc to return.
        )[this.prop][0];

    }

    async findOne( { docId } ) {

        return (

            // Find and select the target subdoc.
            await this.ctrl.findOne({
                search: { [`${this.prop}._id`]: docId }
            }, {
                // Select the potential matching document.
                select: `${this.prop}.$`
            })

        // Select the target subdoc to return.
        )[this.prop].id( docId );

    }

    async updateOne( { docId, data } ) {

        return (

            // Find and update the target subdoc.
            await this.ctrl.updateOne({
                search: { [`${this.prop}._id`]: docId },
                data: this.mapSubDocKeys( data, true )
            }, {
                // Select the subdoc list - TODO figure out how to not have to select the entire sub doc list here. The "potential" flag ".$" doesn't work with the { new: true } flag on the mongoose query.
                select: `${this.prop}`
            })

        // Select the target subdoc to return.
        )[this.prop].id(docId);

    }

}

module.exports = SubSchemaController;