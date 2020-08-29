require("dotenv").config();
const app = require("./config/express");

require("./config/mongoose");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`);
});