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
router.post('/lists/:listId/items', async (req, res) => {

    try {

        const newItem = await ListItem.create({
            
            name: req.body.name,
            ListId: req.params.listId
        });
        res.json(newItem);

    } catch (err) {

        res.status(401).json(err);
    }

});

//GET a single list's item by ID
router.get('/listitems/:itemId', async ( req, res ) => {

    try {

        const singleListItem = await ListItem.findOne({
            where: {
                id: req.params.itemId,
                ListId: req.params.listId

            }
        });

        res.json( singleListItem );

    } catch(err){

        res.status(401).json(err);

    }

});

//UPDATE a single list item by id
router.patch('/listitems/:itemId', async ( req, res, next ) => {

    try {
        
        const update = await ListItem.update(
            req.body,
            {
                where: { id: req.params.itemId }
            }
        );

        res.json( { updated: update[0] } );

    } catch (err) {

        res.status(401).json(err);
    }

});

module.exports = router;