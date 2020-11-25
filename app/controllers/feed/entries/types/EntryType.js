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

    validation;

    constructor( key ) {

        this.key = key;

    }

    async onCreateResHandler( entries, options ) {
        
        return [ entries ];

    }

    getRouteConfig() {

        const entryCtlrConfig = {
            keyMap: { body: "entryData" }
        };

        return [`/:feedId/${this.key}`, {
            post: {
                defaultError: `add the feed ${this.key} entry`,
                validation: this.validation,
                ctrl: [ this.getController(), entryCtlrConfig ]
            }
        }];

    }

    getController() {
        return async ( options ) => {

            const { feedId, user, entryData } = options;
        
            const entry = await create(
                feedId,
                user._id,
                this.key,
                entryData
            );

            return feedEventResponse( ...( await this.onCreateResHandler( [ entry ], options ) ) );

        }
    }

}

module.exports = EntryType;