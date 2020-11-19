const { Feed } = require("../../../../models");
const ObjectId = require("mongoose").Types.ObjectId;

const create = async (feedId, by, action, data) => {
    
    const entryId = new ObjectId();

    const feed = await Feed.findByIdAndUpdate( feedId, {
        $push: {
            items: {
                _id: entryId,
                action,
                by,
                data
            }
        }
    }, { new: true } ).populate("items.by", "name").select("items");

    return feed.items.id( entryId );

}

const feedEventResponse = ( entries, studentUpdate ) => ({ entries, studentUpdate });

class EntryType {

    constructor( key ) {

        this.key = key;

    }

    getRequestData( req ) {
        return;
    }

    async onCreateResHandler( entries, req ) {
        
        return [ entries ];

    }

    getCreateRoute() {
        return async ( options ) => {

            const { feedId, user } = options;
        
            const entry = await create(
                feedId,
                user._id,
                this.key,
                this.getRequestData( req )
            );

            return feedEventResponse( ...( await this.onCreateResHandler( [ entry ], options ) ) );

        }
    }

}

module.exports = EntryType;