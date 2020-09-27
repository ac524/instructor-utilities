const mail = require('../config/utils/mail');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const util = require("util");

// Load input validation
const passwordHash = require("../config/utils/passwordHash");
const validateRegisterInput = require("../config/validation/register");
const validateLoginInput = require("../config/validation/login");
const jwtSign = util.promisify( jwt.sign );

// Load User model
const { User, Token } = require("../models");
const Classroom = require("../models/Classroom");

const sendUserVerifyEmail = async (user) => {

    const token = new Token({
        relation: user._id,
        token: crypto.randomBytes(16).toString('hex')
    });
 
    // Save the verification token
    await token.save();

    await mail.send(
      "welcome",
      {
        name: "Anthony Brown",
        verificationLink: `http://localhost:3000/validate-email/${token.token}`
      },
      {
        to: user.email,
        // to: "ac524.brown@gmail.com",
        subject: "Welcome to Classroom! Please verify your email"
      }
    );

}

module.exports = {
  authenticated(req, res) {

    if( req.userSocket ) req.userSocket.join( req.user._id );

    res.json( req.user );

  },
  async register(req, res) {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid)

      return res.status(400).json(errors);

    try {

      const existingUser = await User.findOne({ email: req.body.email });

      if( existingUser )

        return res.status(400).json({ email: "Email already exists" });

      // Create the User
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await passwordHash( req.body.password )
      });

      await user.save();

      // Create the User's classroom
      const classroom = new Classroom({
        name: req.body.roomname
      });

      await classroom.save();

      // Add the classroom id to the user
      await user.update({ $push: { classrooms: classroom._id } });

      // Add the staff member to the classroom
      await classroom.update({ $push: { staff: {
        role: "instructor",
        user: user._id
      } } });

      await sendUserVerifyEmail( user );

      res.json( { success: true } );

    } catch( err ) {

      // console.log( err );

      res.status(500).json({ default: "Something went wrong" });

    }

  },
  async resendValidation(req, res) {

    try {

      const user = await User.findOne({ email: req.body.email });

      if( !user ) res.status(404).json({default: "Email not found"});

      await sendUserVerifyEmail( user );

      res.json({success: true});

    } catch(err) {
      
      console.log( err );

      return res.status(500).json({default: "Something went wrong"});

    }

  },
  async validateEmail(req, res) {

    try {

      const token = await Token.findOne({ token: req.params.token });

      if( !token ) return res.status(404).json({default: "Token not found"});
  
      const update = { isVerified: true };

      await User.findByIdAndUpdate( token.relation, update );

      req.app.get("io").to( token.relation ).emit("updateUser", update);
  
      res.json({ success: true });

    } catch {

      return res.status(500).json({default: "Something went wrong"});

    }

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