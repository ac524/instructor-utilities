// const redirectAuthenticated = require("../config/middleware/redirectAuthenticated");
// const isAuthenticated = require("../config/middleware/isAuthenticatedRoute");
const path = require("path");

const router = require("express").Router();

// router.get("/", redirectAuthenticated, (req, res) => {
//   res.render( "home" );
// });

// router.get("/lists", isAuthenticated, (req, res) => {
//   res.render( "lists" );
// });

// router.get("/signup", redirectAuthenticated, (req, res) =>{
//   res.render( "signup" );
// });

// router.get("/logout", function(req, res) {
//   req.logout();
//   res.redirect("/");
// });

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname+'/../../views/index.html'));
});


module.exports = router;