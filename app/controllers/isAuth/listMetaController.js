const router = require("express").Router();
const listMetaActionMiddlewareFactory = require("../../config/middleware/listMetaActionFactory");

const metaIdArrays = [ "selected", "disabled" ];

// Build the required routes for each meta property that uses an array based value
metaIdArrays.forEach( metaKey => {

    router.post( `/lists/:listId/meta/${metaKey}`, listMetaActionMiddlewareFactory( 'pushItemIdToArray', metaKey ) );

    router.delete( `/lists/:listId/meta/${metaKey}/:itemId`, listMetaActionMiddlewareFactory( 'removeItemIdFromArray', metaKey ) );
    
    router.delete( `/lists/:listId/meta/${metaKey}`, listMetaActionMiddlewareFactory( 'clearArray', metaKey ) );

} );

module.exports = router;