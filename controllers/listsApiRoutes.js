const router = require("express").Router();

//GET saved lists
router.get('/lists', ( req, res ) =>{
    //Lists.all( ( results ) =>{
       
        console.log( results )
        res.end();
  //  } )
});


//CREATE a new lists
router.post('/lists', ( req, res ) =>{
   // Lists.create( req.body, ( results ) =>{

        console.log( results )
        res.end();
   // } )

});

//GET a single list by ID
router.get('/lists/:listid', ( req, res ) =>{
    //Lists.findOne(( result ) => {

        console.log( result )
        res.end();
   // } )

});
    

//UPDATE a target list by ID
router.patch('lists/:listid', ( req, res, next ) => {
   // Lists.update({ lists: req.body.list }, { where: { id: req.params.id }})
   // .then(( result ) =>{
       
        console.log( result )
        res.end();
    //} )
    
});

//GET a lists items
router.get('/lists/:listid/items', ( req, res ) =>{
    //Lists.getListsItems(( results ) =>{
    
        console.log( results )
        res.end();
   // } )

});

//CREATE new list item
router.post('/lists/:listid/items', ( req, res ) =>{
   // Lists.createItem( req.body, ( result ) =>{

        console.log( result )
        res.end();
    //} )

});

//GET a single list's item by ID
router.get('/lists/:listid/items/:itemid', ( req, res ) =>{
    //Lists.getListItemById(( results ) =>{

        console.log( results )
        res.end();
    //} )

});

//UPDATE a single list item by id
router.patch('/lists/:listid/items/:itemid', ( req, res, next ) =>{

    console.log( result ) 
    res.end();
});

module.exports = router