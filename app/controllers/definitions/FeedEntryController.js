
const SubSchemaController = require("../types/SubSchemaController");
const feedCtrl = require("../feed");
const studentCtrl = require("../student");
const userCtrl = require("../user");

/**
 * @param {FeedEntryController} ctrl 
 * @param {import('mongoose').Schema.Types.ObjectId} docId 
 * @returns 
 */
const updateStudentAggregates = async (ctrl, entry) => {

    const feed = await ctrl.findOwner( { docId: entry._id }, { select: "for" } );

    const student = await studentCtrl.findOne({ docId: feed.for });

    const aggKeys = student.getAggregateKeysByAction( entry.action );

    if( !aggKeys.length ) return {};

    const aggUpdate = await student.getFeedAggregateData(aggKeys);

    await studentCtrl.updateOne({ docId: student._id, data: aggUpdate });

    return {
        studentUpdate: {
            _id: student._id,
            ...aggUpdate
        }
    }

}

class FeedEntryController extends SubSchemaController {

    constructor( action ) {

        super( "item", feedCtrl );

        this.action = action;

    }

    async createOne( { createdBy, data, ...options } ) {

        const newEntry = await super.createOne( {
            ...options,
            data: {
                by: createdBy,
                action: this.action,
                data
            }
        });

        return {
            // Returns as an array (for future dev where one entry might cause another to insert by reaction causing multiple returns)
            entries: [
                // Create the new entry
                await this.findOne({ docId: newEntry._id })
            ],
            ...( await updateStudentAggregates(this, newEntry) ) 
        };

    }

    async findOne( options, queryOptions = {} ) {

        const entry = await super.findOne( options, queryOptions );

        if( !entry ) return entry;

        return {
            ...entry._doc,
            by: await userCtrl.findOne( { docId: entry.by }, { select: "name" } )
        }

        // TODO Find a way to rework underlying sub schema code to allow a populate for sub fields.
        // return super.findOne( options, {
        //     populate: "items.by",
        //     ...queryOptions
        // }  );

    }

}

module.exports = FeedEntryController;