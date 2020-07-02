const express = require("express");

const path = require("path");

const app = express();
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT ||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log("App listening on Port" + PORT);
});
