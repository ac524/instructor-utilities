
const SubSchemaController = require("../types/SubSchemaController");
const feedCtrl = require("../feed");

/**
 * @param {FeedEntryController} ctrl 
 * @param {import('mongoose').Schema.Types.ObjectId} docId 
 * @returns 
 */
const updateStudentAggregates = async (ctrl, entry, feed) => {

    if( !feed ) feed = await ctrl.findOwner( { docId: entry._id }, { select: "for" } );

    const student = await ctrl.effect("room-student").findOne({ docId: feed.for });

    const aggKeys = student.getAggregateKeysByAction( entry.action );

    if( !aggKeys.length ) return {};

    const aggUpdate = await student.getFeedAggregateData(aggKeys);

    await ctrl.effect("room-student").updateOne({ docId: student._id, data: aggUpdate });

    return {
        studentUpdate: {
            _id: student._id,
            ...aggUpdate
        }
    }

}

const formatChangeRes = async (ctrl,entry,feed) => ({
    entries: [ entry ],
    ...( await updateStudentAggregates(ctrl, entry, feed) ) 
})

const populateBy = async (entry, ctrl) => ({
  ...entry._doc,
  by: await ctrl.effect("user").findOne({ docId: entry.by }, { select: "name" }),
});

class FeedEntryController extends SubSchemaController {

    constructor( action ) {

        super( "item", feedCtrl, action );

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

        return formatChangeRes( this, await this.findOne({ docId: newEntry._id }) );

    }
    
    async updateOne( { data, ...options } ) {

        const entry = await super.updateOne( {
            ...options,
            // Data should be nested in the entry's `data` field.
            data: { data }
        } );

        if( !entry ) return entry;

        return formatChangeRes( this, await populateBy( entry, this ) );

    }

     async deleteOne( { docId, ...options } ) {

        // Feed needs to be fetch before delete, as it won't be avaible later to find by this entry after it has been remove.
        const feed = await this.findOwner( { docId: docId }, { select: "for" } );

        const entry = await super.deleteOne( { docId, ...options } );

        if( !entry ) return entry;

        return formatChangeRes( this, await populateBy( entry, this ), feed );

     }

    async findOne( options, queryOptions = {} ) {

        const entry = await super.findOne( options, queryOptions );

        if( !entry ) return entry;

        // TODO Find a way to rework underlying sub schema code to allow a populate for sub fields.
        return populateBy( entry, this );

        // return super.findOne( options, {
        //     populate: "items.by",
        //     ...queryOptions
        // }  );

    }

}

module.exports = FeedEntryController;