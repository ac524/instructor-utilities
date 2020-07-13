const express = require("express");

const session = require("express-session");
const passport = require("./passport");

const exphbs = require("express-handlebars");
const exphbsSections = require("express-handlebars-sections");

const app = express();

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

// Register API Controllers.
app.use( "/api", ...require("../controllers") );

// Global middleware for routes registered after this.
app.use( require("./middleware/provideUserToViews.js") );

// Register HTML routes last.
app.use( ...require("../routes") );

module.exports = app;