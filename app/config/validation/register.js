const Validator = require("validator");
const isEmpty = require("is-empty");

const checks = {
  name: ( data, errors ) => {

    data.name = !isEmpty(data.name) ? data.name : "";

    if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
    }

  },
  email: ( data, errors ) => {

    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

  },
  password: ( data, errors ) => {

    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }

  },
  roomname: ( data, errors ) => {

    data.roomname = !isEmpty(data.roomname) ? data.roomname : "";

    if (Validator.isEmpty(data.roomname)) {
      errors.roomname = "Classroom name is required";
    }

  }
}

module.exports = function validateRegisterInput( data, skips = [] ) {

  let errors = {};

  Object.keys( checks )
    .filter( check => !skips.includes(check) )
    .forEach( check => checks[check]( data, errors ) )

  return {
    errors,
    isValid: isEmpty(errors)
  };

};