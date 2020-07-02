const express = require("express");
const exphbs = require("express-handlebars");
const exphbsSections = require("express-handlebars-sections");

const app = express();
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT ||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure Handlebars with Express
const hbs = exphbs.create({ defaultLayout: "main" });
exphbsSections(hbs);
app.engine("handlebars", hbs.engine );
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log(`App listening on Port: ${PORT}`);
});
