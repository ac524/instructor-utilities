const router = require("express").Router();

const path = require("path");

router.get("/", (req, res) => {
  res.render( "lists" );
});

router.get("*", (req, res) => {
  res.render( "lists" );
});

module.exports = router;
