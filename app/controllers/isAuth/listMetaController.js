const router = require("express").Router();
const { ListMeta } = require("../../models");

// console.log( "load meta routes" );

router.post( "/lists/:listId/select/:itemId", async ( req, res ) => {

    const metaProperties = {
        ListId: req.params.listId,
        UserId: req.user.id,
        key: 'selected'
    };

    try {

        let selectedMeta = await ListMeta.findOne( {
            where: metaProperties,
            attributes: ['value']
        } );

        console.log( selectedMeta );

        const exists = Boolean( selectedMeta );

        if( !exists ) selectedMeta = { dataValues: { value: [] } };

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