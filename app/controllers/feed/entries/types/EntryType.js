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

    onCreateResHandler( entries, req ) {
        
        return [ entries ];

    }

    getCreateRoute() {
        return async ( req, res ) => {
            
            try {

                const entry = await create(
                    req.params.feedId,
                    req.user._id,
                    this.key,
                    this.getRequestData( req )
                );

                res.json( feedEventResponse( ...( await this.onCreateResHandler( [ entry ], req ) ) ) );

            } catch(err) {

                console.log(err);
    
                res.status(500).json({ default: `Unable to ${this.key} student` });
    
            }

        }
    }

}

module.exports = EntryType;