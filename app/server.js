require("dotenv").config();
const mongoose = require("mongoose");
require("./models")
const app = require("./config/express");

const PORT = process.env.PORT || 3001;

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost/instructorutilities",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`);
});