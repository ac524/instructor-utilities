const { User } = require("../../models");

module.exports = (jwtPayload, done) => {

    User.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => {
          console.log(err)
          done(null, false);
      });
  
  }