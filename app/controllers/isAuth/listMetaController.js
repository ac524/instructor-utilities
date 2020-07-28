const router = require("express").Router();
const { ListMeta } = require("../../models");

// console.log( "load meta routes" );
const getIndexOptions = ( { params: { listId: ListId }, user: { id: UserId } }, key ) => ({
    UserId,
    ListId,
    key
});

router.post( "/lists/:listId/select/:itemId", async ( req, res ) => {

    const metaProperties = getIndexOptions( req, 'selected' );

    try {

        let selectedMeta = await ListMeta.findOne( {
            where: metaProperties,
            attributes: ['value']
        } );

        const exists = Boolean( selectedMeta );

        if( !exists ) selectedMeta = { dataValues: { value: [] } };

        if( selectedMeta.dataValues.value.includes( req.params.itemId ) ) throw new Error("Cannot select duplicate IDs");

        selectedMeta.dataValues.value.push( parseInt(req.params.itemId) );

        exists

            ? await ListMeta.update( selectedMeta.dataValues, { where: metaProperties } )

            : await ListMeta.create( {
                ...metaProperties,
                ...selectedMeta.dataValues
            } );

        res.json( { selected: true } );

    } catch( err ) {

        res.status(401).json(err);

    }

} );

router.post( "/lists/:listId/unselect/:itemId", async ( req, res ) => {

} );

router.post( "/lists/:listId/unselect/:itemId", async ( req, res ) => {
    

} );

router.post( "/lists/:listId/unselect/:itemId", async ( req, res ) => {


} );

module.exports = router;