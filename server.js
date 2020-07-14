require("dotenv").config();

const { sequelize } = require("./models");
const app = require("./config/express");

const PORT = process.env.PORT ||3000;

sequelize.sync().then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`);
  });
});