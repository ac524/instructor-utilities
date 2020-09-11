require("dotenv").config();

const mail = require("./app/config/utils/mail");

mail.send("welcome", {
    verificationLink: "http://localhost:3000"
}, { to: "ac524.brown@gmail.com", subject: "Testing" });