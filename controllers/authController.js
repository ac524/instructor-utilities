const router = require("express").Router();
const passport = require("../config/passport");
const { User } = require("../models");

router.post("/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});

router.post("/signup", function(req, res) {
  User
    .create({
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

module.exports = router;