require("dotenv").config();

const { sequelize } = require("./models");
const app = require("./config/express");

const PORT = process.env.PORT || 3001;

const force = false;
sequelize.sync({ force }).then(() => {

  app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`);
  });

});