const util = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/options")( "secret" );

// Load User model
const { InvalidDataError } = require("../config/errors");

const userCtrl = require("./user");

const jwtSign = util.promisify( jwt.sign );

/**
 * Type Definition Imports
 * @typedef {import('../models/schema/UserSchema').UserDocument} UserDocument
 * @typedef {import('../config/validation/definitions/loginValidation').LoginData} LoginData
 */

/** CONTROLLER METHODS **/

/**
 * @typedef GetAuthUserOptions
 * @property {UserDocument} user
 * 
 * @param {GetAuthUserOptions} param0 
 */
const authenticated = ({ user }) => user;

/**
 * @typedef LoginOptions
 * @property {LoginData} credentials
 * 
 * @param {LoginOptions} param0 
 */
const login = async ({ credentials }) => {

  const { email, password } = credentials;

  // Find user by email
  const user =  await userCtrl.findOne({ search: { email } });

  if (!user)

    throw new InvalidDataError( "Email or password is invalid." );

  const isMatch = await bcrypt.compare( password, user.password );

  if( !isMatch )

    throw new InvalidDataError( "Email or password is invalid." );

  // User matched
  // Create JWT Payload
  const payload = {
    id: user.id,
    name: user.name
  };

  const token = await jwtSign(
    payload,
    secret,
    {
      expiresIn: 31556926 // 1 year in seconds
    }
  );

  return {
    success: true,
    token: "Bearer " + token,
    user
  }

}

module.exports = {
  authenticated,
  login
}