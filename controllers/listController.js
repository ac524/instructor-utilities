const router = require("express").Router();
const { List } = require("../models");

//GET saved lists
router.get('/lists', ( req, res ) => {

    res.end();
    
});


//CREATE a new lists
router.post('/lists', ( req, res ) => {

    res.end();

});

//GET a single list by ID
router.get('/lists/:listid', ( req, res ) => {

    res.end();

});
    

//UPDATE a target list by ID
router.patch('lists/:listid', ( req, res, next ) => {

    res.end();
    
});

module.exports = router;