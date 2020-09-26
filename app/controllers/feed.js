const { Feed, Classroom } =  require("../models");

const feedEntry = require("./utils/feedEntry");

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

                items.push( await feedEntry.populate( feed.items[i] ) );

            res.json( items );

        } catch(err) {

            res.status(500).json({default:"Unable to get feed items"});

        }

    },
    async createComment( req, res ) {

        try {

            res.json(
                await feedEntry.createAndBroadcast(
                    req,
                    req.params.feedId,
                    req.user._id,
                    "comment",
                    { comment: req.body.comment }
                )
            );

        } catch(err) {

            res.status(500).json({default:"Unable to get create comment"});

        }

    },
    async createElevate( req, res ) {

        try {

            const entry = await feedEntry.createAndBroadcast(
                req,
                req.params.feedId,
                req.user._id,
                "elevate"
            );

            await feedEntry.broadcastStudentAggUpdate(
                req,
                req.params.feedId
            )

            res.json( entry );

        } catch(err) {

            res.status(500).json({default:"Unable to elevate student"});

        }

    },
    async createDeelevate( req, res ) {

        try {

            const entry = await feedEntry.createAndBroadcast(
                req,
                req.params.feedId,
                req.user._id,
                "deelevate"
            )

            await feedEntry.broadcastStudentAggUpdate(
                req,
                req.params.feedId
            )

            res.json( entry );

        } catch(err) {

            res.status(500).json({default:"Unable to de-elevate student"});

        }

    }
}