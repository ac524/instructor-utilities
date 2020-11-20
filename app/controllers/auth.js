const util = require("util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/options")( "secret" );

// Load input validation
const validateLoginInput = require("../config/validation/login");

// Load User model
const { User } = require("../models");
const { InvalidDataError } = require("../config/errors");

const jwtSign = util.promisify( jwt.sign );

/** CONTROLLER METHODS **/

const authenticated = ({ user }) => user;

const login = async ({ body }) => {

  // Form validation
  const { errors, isValid } = validateLoginInput( body );

  // Check validation
  if (!isValid)

    throw new InvalidDataError( "Invalid request.", errors );

  const email = body.email;
  const password = body.password;

  // Find user by email
  const user = await User.findOne({ email })

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