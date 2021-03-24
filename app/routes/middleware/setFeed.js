const feedCtrl = require("../../controllers/feed");
const { NotFoundError } = require("../../config/errors");

const setFeed = async (req, res, next) => {

    try {

        let feed;
        let feedId;

        if( req.params.itemId ) {

            const entryId = req.params.itemId;
            feed = await feedCtrl.findOne(
                { search: { ["items._id"]: entryId } },
                { select: "room for in items.$" }
            );

            if( !feed ) throw new NotFoundError( "Target entry not found." );

            req.crdata.set( "feedItem", feed.items.id(entryId) );

        } else {

            feedId = req.params.feedId || req.body.feedId
            feed = await feedCtrl.findOne(
                { docId: feedId },
                { select: "room for in" }
            );
        }

        if( !feed ) throw new NotFoundError( "Target feed not found." );

        req.crdata.set( "feedId", feedId );
        req.crdata.set( "feed", feed );

        next();

    } catch( err ) {
        
        next(err);

    }

}

module.exports = setFeed;