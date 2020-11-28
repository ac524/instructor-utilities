const mail = require('../../mail');

const tokenCtrl = require("../../controllers/token");

const homeUrl = require("../../config/options")( "publicUrl" );

const sendUserVerifyEmail = async (user) => {

    const token = await tokenCtrl.create({ relation: user._id });

    await mail.send(
      "welcome",
      {
        name: "Anthony Brown",
        verificationLink: `${homeUrl}/validate-email/${token.token}`
      },
      {
        to: user.email,
        // to: "ac524.brown@gmail.com",
        subject: "Welcome to Classroom! Please verify your email"
      }
    );

}

module.exports = sendUserVerifyEmail;