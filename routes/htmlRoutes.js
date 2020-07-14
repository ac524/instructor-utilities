const redirectAuthenticated = require("../config/middleware/redirectAuthenticated");
const isAuthenticated = require("../config/middleware/isAuthenticatedRoute");

const router = require("express").Router();

router.get("/", redirectAuthenticated, (req, res) => {
  res.render( "home" );
});

router.get("/lists", isAuthenticated, (req, res) => {
  res.render( "lists" );
});

router.get("/signup", redirectAuthenticated, (req, res) =>{
  res.render( "signup" );
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.get("*", (req, res) => {
  res.status(404).render('404');
});


module.exports = router;