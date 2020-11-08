const { Feed } =  require("../../models");
const entryTypes = require("./entries");

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

                items.push( feed.items[i] );

            res.json( items );

        } catch(err) {

            console.log( err );

            res.status(500).json({default:"Unable to get feed items"});

        }

    },
    entryTypes
}