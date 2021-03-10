const { User } = require("../../controllers/definitions/models");

module.exports = (jwtPayload, done) => {

    User.findById(jwtPayload.id)
      .select("name email isVerified classrooms date")
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