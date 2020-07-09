const router = require("express").Router();

router.get("/", (req, res) => {
  res.render( "lists" );
});

router.get("*", (req, res) => {
  res.render( "lists" );
});

module.exports = router;
