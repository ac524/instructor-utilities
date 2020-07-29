const router = require("express").Router();
const listMetaActionMiddlewareFactory = require("../../config/middleware/listMetaActionFactory");

const metaIdArrays = [ "selected", "disabled" ];

// Build the required routes for each meta property that uses an array based value
metaIdArrays.forEach( metaKey => {

    router.post( `/lists/:listId/meta/${metaKey}`, listMetaActionMiddlewareFactory( 'pushItemIdToArray', metaKey ) );

    router.delete( `/lists/:listId/meta/${metaKey}/:itemId`, listMetaActionMiddlewareFactory( 'removeItemIdFromArray', metaKey ) );
    
    router.delete( `/lists/:listId/meta/${metaKey}`, listMetaActionMiddlewareFactory( 'clearArray', metaKey ) );

} );



// router.post( "/lists/:listId/select", async ( req, res ) => await pushToValueArray( req, res, 'selected' ) );

// router.patch( "/lists/:listId/unselect", async ( req, res ) => await removeFromValueArray( req, res, 'selected' ));

// router.patch( "/lists/:listId/select/clear", async ( req, res ) => await clearValueArray( req, res, 'selected' ));

// router.post( "/lists/:listId/disable", async ( req, res ) => await pushToValueArray( req, res, 'disabled' ) );

// router.patch( "/lists/:listId/enable", async ( req, res ) => await removeFromValueArray( req, res, 'disabled' ));

// router.patch( "/lists/:listId/disable/clear", async ( req, res ) => await clearValueArray( req, res, 'disabled' ));


// router.post( "/lists/:listId/disabled", async ( req, res ) => await pushToValueArray( req, res, 'disabled' ) );

module.exports = router;