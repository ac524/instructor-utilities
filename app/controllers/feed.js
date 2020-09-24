const { Feed, User } =  require("../models");
const ioEmit = require("./utils/ioEmit");
const ObjectId = require("mongoose").Types.ObjectId;

const populateEntry = async entry => {

    switch( entry.action ) {
        case "elevate":
            entry.data.to = await User.findById(entry.data.to).select("name");
            break;
    }

    return entry;

}

const createEntry = async ( feedId, by, action, data ) => {

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

    return await populateEntry( feed.items.id( entryId ) );

}

const broadcastEntry = async ( req, feedId, entry ) => {

    ioEmit( req, req.roomIo, `feedpush:${feedId}`, entry );

}

module.exports = {
    async getSingle( req, res ) {

        try {

            res.json( await Feed.findById( req.params.feedId ) );

        } catch(err) {

            res.status(500).json({default:"Unable to get feed"});

        }

    },
    async getSingleItems( req, res ) {

        try {

            const feed =
                await Feed
                    .findById( req.params.feedId )
                    .populate("items.by","name")
                    .select("items")

            const items = [];

            for(let i=0; i < feed.items.length; i++)

                items.push( await populateEntry( feed.items[i] ) );

            res.json( items );

        } catch(err) {

            res.status(500).json({default:"Unable to get feed items"});

        }

    },
    async createComment( req, res ) {

        try {

            const entry = await createEntry(
                req.params.feedId,
                req.user._id,
                "comment",
                { comment: req.body.comment }
            );

            broadcastEntry( req, req.params.feedId, entry );

            res.json( entry );

        } catch(err) {

            res.status(500).json({default:"Unable to get create comment"});

        }

    },
    async createElevate( req, res ) {

        try {

            const entry = await createEntry(
                req.params.feedId,
                req.user._id,
                "elevate",
                { to: req.body.to }
            );

            broadcastEntry( req, req.params.feedId, entry );

            res.json( entry );

        } catch(err) {

            res.status(500).json({default:"Unable to elevate student"});

        }

    },
    async createDeelevate( req, res ) {

        try {

            const entry = await createEntry(
                req.params.feedId,
                req.user._id,
                "deelevate"
            );

            broadcastEntry( req, req.params.feedId, entry );

            res.json( entry );

        } catch(err) {

            res.status(500).json({default:"Unable to de-elevate student"});

        }

    }
}