const { Feed, User } =  require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

const populateEntry = async entry => {

    switch( entry.action ) {
        case "elevate":
            entry.data.to = await User.findById(entry.data.to).select("name");
            break;
    }

    return entry;

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

            const entryId = new ObjectId();

            const feed = await Feed.findByIdAndUpdate( req.params.feedId, {
                $push: {
                    items: {
                        _id: entryId,
                        action: "comment",
                        by: req.user._id,
                        data: {
                            comment: req.body.comment
                        }
                    }
                }
            }, { new: true } ).populate("items.by", "name").select("items");

            res.json( feed.items.id( entryId ) );

        } catch(err) {

            res.status(500).json({default:"Unable to get create comment"});

        }

    }
}