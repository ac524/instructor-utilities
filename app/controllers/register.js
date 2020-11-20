const mail = require('../config/utils/mail');

const passwordHash = require("../config/utils/passwordHash");

// Load input validation
const validateRegisterInput = require("../config/validation/register");
const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");

const { User, Token, Classroom } = require("../models");
const { RouteError } = require('../config/errors');

/** CONTROLLER METHODS **/

const register = async ({ body }) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(body);

  // Check validation
  if (!isValid)

    throw new RouteError( 400, "Invalid registration request.", errors );

  let classroom;
  const hasCode = Boolean(body.code);

  if( hasCode ) {
  
    // Create the User's classroom
    const token = await Token.findOne({
      token: body.code
    });

    if( !token )  throw new RouteError( 404, "Unknown registration code.", { code: "Code not found" } );

    classroom = await Classroom.findOne({
      registerCode: token._id
    });

    if( !classroom ) throw new RouteError( 400, "Registration code claimed.", { code: "Your room is no longer available" } );
    
  }

  const existingUser = await User.findOne({ email: body.email });

  if( existingUser )

    throw new RouteError( 400, "Cannot create user.", { email: "Email already exists." } );

  // Create the User
  const user = new User({
    name: body.name,
    email: body.email,
    password: await passwordHash( body.password ),
    isVerified: !mail.isEnabled
  });

  await user.save();

  if( classroom ) {

    classroom.name = body.roomname;

  } else {

    // Create the User's classroom
    classroom = new Classroom({
      name: body.roomname
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

}

module.exports = {
  register
}