const mail = require('../../config/utils/mail');
const crypto = require('crypto');

const { Token } = require("../../models");
const homeUrl = require("../../config/options")( "publicUrl" );

const sendUserVerifyEmail = async (user) => {

    const token = new Token({
        relation: user._id,
        token: crypto.randomBytes(16).toString('hex')
    });
 
    // Save the verification token
    await token.save();

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