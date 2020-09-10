const mail = require('../config/utils/mail');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const util = require("util");

// Load input validation
const passwordHash = require("../config/utils/passwordHash");
const validateRegisterInput = require("../config/validation/register");
const validateLoginInput = require("../config/validation/login");
const jwtSign = util.promisify( jwt.sign );

// Load User model
const { User } = require("../models");
const Classroom = require("../models/Classroom");
const Staff = require("../models/Staff");

module.exports = {
  authenticated(req, res) {

    res.json( req.user );

  },
  async register(req, res) {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid)

      return res.status(400).json(errors);

    try {

      await mail.send("welcome", {}, {
        // to: newUser.email,
        to: "ac524.brown@gmail.com",
        subject: "Welcome to Classroom!"
      });

      const user = await User.findOne({ email: req.body.email });

      if( user )

        return res.status(400).json({ email: "Email already exists" });

      // Create the User
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: await passwordHash( req.body.password )
      });

      await newUser.save();

      // Create the User's classroom
      const classroom = new Classroom({
        name: req.body.roomname
      });

      await classroom.save();

      // Add the classroom id to the user
      await newUser.update({ $push: { classrooms: classroom._id } });

      // Create the user's staff entry for the classroom
      const staff = new Staff({
        role: "instructor",
        user: newUser._id,
        classroom: classroom._id
      });

      await staff.save();

      // Add the staff member to the classroom
      await classroom.update({ $push: { staff: staff._id } });

      res.json( { success: true } );

    } catch( err ) {

      console.log( err );
      // console.log( err.response.body );

      res.status(500).json({ default: "Something went wrong" });

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
        process.env.PASSPORT_SECRET,
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