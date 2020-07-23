const router = require("express").Router();
const { List } = require("../../models");

//GET saved lists
router.get('/lists', async (req, res) => {

    try {

        const listsResult = await List.findAll({
            where: {
                UserId: req.user.id
            }
        });

        res.json(listsResult);

    } catch (err) {

        res.status(401).json(err);

    }

});

//GET a single list by ID
router.get('/lists/:listId', async ( req, res ) => {

    try {

        const listResults = await List.findOne({
            where: {
                id: req.params.listId,
                UserId: req.user.id
            }
        });
        
        res.json( listResults );

    } catch ( err ) {
        
        res.status(401).json(err);

    };

});

//CREATE a new lists
router.post('/lists', async (req, res) => {
    
    try {

        const newList = await List.create({
            name: req.body.name,
            UserId : req.user.id
        })

        res.json(newList);

    } catch ( err ) {
        
        res.status(401).json(err);
    }
    
});

//UPDATE a target list by ID
router.patch('/lists/:listId', async (req, res) => {

    try {
        const targetList = await List.update(req.body, {
            where:
            {
                id : req.params.listId
            }
        });

        res.json(targetList);

    }catch(err) {

        res.status(401).json(err);
    }

});

module.exports = router;