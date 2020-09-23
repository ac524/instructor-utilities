const { Feed } =  require("../models");
const User = require("../models/User");

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

    }
}