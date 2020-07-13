const redirectAuthenticated = require("../config/middleware/redirectAuthenticated");
const isAuthenticated = require("../config/middleware/isAuthenticated");

const router = require("express").Router();

router.get("/signup", redirectAuthenticated, (req, res) =>{
  res.render( "signup" );
});

router.get("/", redirectAuthenticated, (req, res) => {
  res.render( "home" );
});

router.get("/lists", isAuthenticated, (req, res) => {
  res.render( "lists" );
});

router.get("*", (req, res) => {
  res.redirect( "/" );
});


module.exports = router;