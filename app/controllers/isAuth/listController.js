const router = require("express").Router();
const { List } = require("../../models");

//GET saved lists
router.get('/lists', ( req, res ) => {

    List
        .findAll({
            where: {
                UserId: req.user.id
            }
        })
        .then( listResults => {
            res.json( listResults );
        } )
        .catch( err => {
            res.status(401).json(err);
        } );
    
});

//GET a single list by ID
router.get('/lists/:listId', ( req, res ) => {

    List
        .findOne({
            where: {
                id: req.params.listId,
                UserId: req.user.id
            }
        })
        .then( listResults => {
            res.json( listResults );
        } )
        .catch( err => {
            res.status(401).json(err);
        } );

});

//CREATE a new lists
router.post('/lists', ( req, res ) => {

    res.end();

});

//UPDATE a target list by ID
router.patch('/lists/:listId', ( req, res ) => {

    res.end();
    
});

module.exports = router;