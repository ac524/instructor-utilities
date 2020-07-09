const router = require("express").Router();
const passport = require("../config/passport");
const db = require("../models");

router.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

router.post("/api/signup", function(req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;