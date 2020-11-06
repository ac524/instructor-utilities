const mail = require('../config/utils/mail');

const passwordHash = require("../config/utils/passwordHash");

// Load input validation
const validateRegisterInput = require("../config/validation/register");
const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");

const { User, Token, Classroom } = require("../models");

module.exports = {
  async register(req, res) {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid)

      return res.status(400).json(errors);

    try {

      let classroom;
      const hasCode = Boolean(req.body.code);

      if( hasCode ) {
      
        // Create the User's classroom
        const token = await Token.findOne({
          token: req.body.code
        });

        if( !token )  return res.status(404).json({ code: "Code not found" });

        classroom = await Classroom.findOne({
          registerCode: token._id
        });

        if( !classroom )  return res.status(400).json({ code: "Your room is no longer available" });
        
      }

      const existingUser = await User.findOne({ email: req.body.email });

      if( existingUser )

        return res.status(400).json({ email: "Email already exists" });

      // Create the User
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await passwordHash( req.body.password ),
        isVerified: !mail.isEnabled
      });

      await user.save();

      if( classroom ) {

        classroom.name = req.body.roomname;

      } else {

        // Create the User's classroom
        classroom = new Classroom({
          name: req.body.roomname
        });

      }

      if( classroom.registerCode ) {
        await Token.findByIdAndDelete(classroom.registerCode);
        classroom.registerCode = undefined;
      }

      await classroom.save();

      // Add the classroom id to the user
      await user.update({ $push: { classrooms: classroom._id } });

      // Add the staff member to the classroom
      await classroom.update({ $push: { staff: {
        role: "instructor",
        user: user._id
      } } });

      if( mail.isEnabled ) await sendUserVerifyEmail( user );

      res.json( { success: true } );

    } catch( err ) {

      // console.log( err );

      res.status(500).json({ default: "Something went wrong" });

    }

  }
}