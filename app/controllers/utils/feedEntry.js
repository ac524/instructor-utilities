const { Feed, User } =  require("../../models");
const ioEmit = require("./ioEmit");
const ObjectId = require("mongoose").Types.ObjectId;

const populate = async entry => {
    // switch( entry.action ) {
    //     case "elevate":
    //         entry.data.to = await User.findById(entry.data.to).select("name");
    //         break;
    // }

    return entry;
}

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

    return await populate( feed.items.id( entryId ) );

}

const broadcast = async (req, feedId, entry) => {

    ioEmit( req, req.roomIo, `feedpush:${feedId}`, entry );

}

const createAndBroadcast = async (req, feedId, by, action, data) => {
    
    const entry = await create( feedId, by, action, data );

    broadcast( req, feedId, entry );

    return entry;

}

module.exports = {
    populate,
    create,
    broadcast,
    createAndBroadcast
};