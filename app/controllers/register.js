const mail = require('../mail');

// Load input validation
const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");

const userCtrl = require("./user");
const tokenCtrl = require("./token");
const roomCtrl = require("./room");

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
    const token = await tokenCtrl.findOne({ token: code });

    if( !token )  throw new NotFoundError( "Unknown registration code.", { code: "Code not found" } );

    classroom =  await roomCtrl.getDoc( { search: { registerCode: token._id } } );

    if( !classroom ) throw new InvalidDataError( "Registration code claimed.", { code: "Your room is no longer available" } );
    
  }

  const { email } = registerData;

  const existingUser = await userCtrl.findOne({ email });

  if( existingUser )

    throw new InvalidDataError( "Cannot create user.", { email: "Email already exists." } );

  const { name, password } = registerData;

  // Create the User
  const user = await userCtrl.create({
    name,
    email,
    password,
    isVerified: !mail.isEnabled
  });

  const { roomname } = registerData;

  if( classroom ) {

    classroom.name = roomname;

  } else {

    // Create the User's classroom
    classroom = roomCtrl.create( { name: roomname }, { save: false } );

  }

  if( classroom.registerCode ) {
    await tokenCtrl.deleteOne( classroom.registerCode );
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