const setAppSearch = async ( req, res, next ) => {

    req.crdata.set( 'search', {
        room: req.params.roomId,
        type: req.params.appTypeId
    } );

    next();

}

module.exports = setAppSearch;