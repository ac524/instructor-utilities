const router = require("express").Router();
const { ListItem } = require("../../models");

//GET a lists items
router.get('/lists/:listId/items', async ( req, res ) => {
    
    try {

        const listItemsResult = await ListItem.findAll({
            where: {
                ListId: req.params.listId
            }
        });

        res.json( listItemsResult );

    } catch( err ) {

        res.status(401).json(err);

    }

});

//CREATE new list item
router.post('/lists/:listid/items', ( req, res ) => {

   res.end();

});

//GET a single list's item by ID
router.get('/lists/:listid/items/:itemid', ( req, res ) => {

    res.end();

});

//UPDATE a single list item by id
router.patch('/lists/:listid/items/:itemid', ( req, res, next ) => {

    res.end();

});

module.exports = router;