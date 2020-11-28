const mail = require('../mail');

const passwordHash = require("../config/utils/passwordHash");

// Load input validation
const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");

const { User, Token, Room } = require("../models");
const { InvalidDataError, NotFoundError } = require('../config/errors');

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('../config/validation/definitions/registerValidation').RegistrationData} RegistrationData
 */

/** CONTROLLER METHODS **/

/**
 * @typedef RegisterOptions
 * @property {RegistrationData} registerData
 * 
 * @param {RegisterOptions} param0 
 */
const register = async ({ registerData }) => {

  let classroom;

  // TODO Code verification and class room association should be moved to middleware so classroom can be passed directily into the controller.
  const { code } = registerData;

  if( code ) {
  
    // Create the User's classroom
    const token = await Token.findOne({
      token: code
    });

    if( !token )  throw new NotFoundError( "Unknown registration code.", { code: "Code not found" } );

    classroom = await Room.findOne({ registerCode: token._id });

    if( !classroom ) throw new InvalidDataError( "Registration code claimed.", { code: "Your room is no longer available" } );
    
  }

  const { email } = registerData;

  const existingUser = await User.findOne({ email });

  if( existingUser )

    throw new InvalidDataError( "Cannot create user.", { email: "Email already exists." } );

  const { name, password } = registerData;

  // Create the User
  const user = new User({
    name,
    email,
    password: await passwordHash( password ),
    isVerified: !mail.isEnabled
  });

  await user.save();

  const { roomname } = registerData;

  if( classroom ) {

    classroom.name = roomname;

  } else {

    // Create the User's classroom
    classroom = new Room({
      name: roomname
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