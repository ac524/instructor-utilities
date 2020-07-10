const router = require("express").Router();

router.get("/signup", (req, res) =>{
  res.render( "signup" );
});

router.get("/", (req, res) => {
  res.render( "lists" );
});

router.get("*", (req, res) => {
  res.render( "lists" );
});


module.exports = router;