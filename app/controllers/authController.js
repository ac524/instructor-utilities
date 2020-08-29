const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const util = require("util");

// Load input validation
const passwordHash = require("../config/utils/passwordHash");
const validateRegisterInput = require("../config/validation/register");
const validateLoginInput = require("../config/validation/login");
const jwtSign = util.promisify( jwt.sign );

// Load User model
const { User } = require("../models");

router.post("/authenticated", passport.authenticate('jwt', { session: false }), (req, res) => {

  res.json( req.user );

});

router.post("/register", async (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid)

    return res.status(400).json(errors);

  try {

    const user = await User.findOne({ email: req.body.email });

    if( user )
  
      return res.status(400).json({ email: "Email already exists" });
  
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: await passwordHash( req.body.password )
    });
  
    res.json( await newUser.save() );

  } catch( err ) {

    res.status(500).json({ default: "Something went wrong" });

  }

});

router.post("/login", async (req, res) => {

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid)

    return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  try {
    // Find user by email
    const user = await User.findOne({ email })
    
    if (!user)

      return res.status(404).json({ default: "Email or password is invalid" });

    const isMatch = await bcrypt.compare(password, user.password);

    if( !isMatch )

      res.status(400).json({ default: "Email or password is invalid" });

    // User matched
    // Create JWT Payload
    const payload = {
      id: user.id,
      name: user.name
    };

    const token = await jwtSign(
      payload,
      process.env.PASSPORT_SECRET,
      {
        expiresIn: 31556926 // 1 year in seconds
      }
    );

    res.json({ success: true, token: "Bearer " + token });

      
  } catch( err ) {

    res.status(500).json({ default: "Something went wrong" });

  }

});

module.exports = router;