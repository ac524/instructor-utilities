
const SubSchemaController = require("../types/SubSchemaController");
const feedCtrl = require("../feed");
const studentCtrl = require("../student");

/**
 * @param {FeedEntryController} ctrl 
 * @param {import('mongoose').Schema.Types.ObjectId} docId 
 * @returns 
 */
const getStudentUpdate = async (ctrl, docId) => {

    const feed = await ctrl.findOwner( { docId }, { select: "for" } );
    const student = await studentCtrl.findOne({ docId: feed.for });

    return {
        studentUpdate: {
            _id: student._id,
            ...(await student.getFeedAggregateData(ctrl.aggregates))
        }
    }

}

class FeedEntryController extends SubSchemaController {

    constructor( action, aggregates = [] ) {

        super( "item", feedCtrl );

        this.action = action;
        this.aggregates = aggregates;

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
            ...(this.aggregates.length ? getStudentUpdate(this, newEntry._id) : {})
        };

    }

    async findOne( options, queryOptions = {} ) {

        return super.findOne( options, {
            populate: "items.by",
            ...queryOptions
        }  );

    }

}

module.exports = FeedEntryController;