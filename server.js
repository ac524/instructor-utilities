require("dotenv").config();

const db = require("./models");
const app = require("./config/express");

const PORT = process.env.PORT ||3000;

db.sequelize.sync().then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`);
  });
});