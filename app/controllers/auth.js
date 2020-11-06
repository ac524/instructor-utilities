const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const util = require("util");

// Load input validation
const validateLoginInput = require("../config/validation/login");
const jwtSign = util.promisify( jwt.sign );

// Load User model
const { User } = require("../models");

module.exports = {
  authenticated(req, res) {

    res.json( req.user );

  },
  async login(req, res) {

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
        process.env.JWT_SECRET,
        {
          expiresIn: 31556926 // 1 year in seconds
        }
      );

      res.json({ success: true, token: "Bearer " + token, user: user });

        
    } catch( err ) {

      res.status(500).json({ default: "Something went wrong" });

    }

  }
}