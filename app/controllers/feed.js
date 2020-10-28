const { Feed, Classroom } =  require("../models");

const feedEntry = require("./utils/feedEntry");

const feedEventResponse = ( entries, studentUpdate ) => ({ entries, studentUpdate });

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

            const entry = await feedEntry.createAndBroadcast(
                req,
                req.params.feedId,
                req.user._id,
                "comment",
                { comment: req.body.comment }
            );

            res.json( feedEventResponse( [ entry ] ) );

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

            // await feedEntry.broadcastStudentAggUpdate(
            //     req,
            //     req.params.feedId
            // )

            const feed = await Feed.findById( req.params.feedId ).populate("room", "students");
            const student = feed.room.students.id( feed.for );

            res.json( feedEventResponse(
                [ entry ],
                {
                    _id: student._id,
                    ...(await student.getFeedAggregateData(["elevation"]))
                }
            ) );

        } catch(err) {

            console.log(err);

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

            // await feedEntry.broadcastStudentAggUpdate(
            //     req,
            //     req.params.feedId
            // )

            const feed = await Feed.findById( req.params.feedId ).populate("room", "students");
            const student = feed.room.students.id( feed.for );

            res.json( feedEventResponse(
                [ entry ],
                {
                    _id: student._id,
                    ...(await student.getFeedAggregateData(["elevation"]))
                }
            ) );

        } catch(err) {

            console.log(err);

            res.status(500).json({default:"Unable to de-elevate student"});

        }

    }
}