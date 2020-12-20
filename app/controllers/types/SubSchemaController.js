const Controller = require("./Controller");
const SchemaController = require("./SchemaController");

const mapKeys = (data,isUpdate) =>    Object.fromEntries(Object.entries(updates).map(([key,value])=>[`students.$.${key}`,value]));

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
        this.ctrl = ctrl;

    }

    mapSubDocKeys( data, isPotential = false ) {

        return Object.keys( data )
            .reduce( (newMap,dataKey) => ({
                ...newMap,
                [`${this.key}${isPotential ? ".$" : ""}.${dataKey}`]: data[dataKey]
            }), {} );

    }

    async findOne( { docId } ) {

        return this.ctrl.findOne({
            search: { [`${this.key}._id`]: docId }
        }, {
            select: `${this.key}.$`
        });

    }

    async updateOne( { docId, data } ) {

        return this.ctrl.findOne({
            search: { [`${this.key}._id`]: docId },
            data: this.mapSubDocKeys( data, true )
        }, {
            select: `${this.key}.$`
        });

    }

}

module.exports = SubSchemaController;