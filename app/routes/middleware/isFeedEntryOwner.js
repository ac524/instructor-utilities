const isFeedEntryOwner = (req,res,next) => {

    if( !req.crdata.get("feedItem").by.equals(req.user._id) )

        throw new InvalidUserError( "You do not own this entry." );

    next();

}

module.exports = isFeedEntryOwner;