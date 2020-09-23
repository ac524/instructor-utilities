const { Feed } =  require("../models");

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

            res.json( (await Feed.findById( req.params.feedId ).select("items")).items );

        } catch(err) {

            res.status(500).json({default:"Unable to get feed items"});

        }

    }
}