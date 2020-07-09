require("dotenv").config();

const express = require("express");

const session = require("express-session");
const passport = require("./config/passport");

const exphbs = require("express-handlebars");
const exphbsSections = require("express-handlebars-sections");

const db = require("./models");

const app = express();
const htmlRoutes = require("./controllers/htmlRoutes");

const PORT = process.env.PORT ||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Handlebars with Express
const hbs = exphbs.create({ defaultLayout: "main" });
exphbsSections(hbs);
app.engine("handlebars", hbs.engine );
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(htmlRoutes);

db.sequelize.sync().then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`);
  });
});
