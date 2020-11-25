const util = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/options")( "secret" );

// Load User model
const { User } = require("../models");
const { InvalidDataError } = require("../config/errors");

const jwtSign = util.promisify( jwt.sign );

/** CONTROLLER METHODS **/

/**
 * @param {object} param0 
 * @param {User} param0.user
 */
const authenticated = ({ user }) => user;

const login = async ({ credentials }) => {

  const { email, password } = credentials;

  // Find user by email
  const user = await User.findOne({ email });

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