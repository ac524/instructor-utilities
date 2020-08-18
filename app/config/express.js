// Import express and create a new server.
const express = require("express");

const app = express();

// Include data parsing middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Install Passport middleware for user authentication and sessions.
const session = require("express-session");
const passport = require("./passport");
const compression = require("compression");
// TODO Research usage of this compression. Does it work for client side requests?
// const msgpack = require("express-msgpack");

// gzip compression.
app.use(compression());
// msgpack compression for json.
// app.use(msgpack());

app.use(session({ secret: process.env.PASSPORT_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Create and install a Handlebars view engine with Express.
// const exphbs = require("express-handlebars");
// const exphbsSections = require("express-handlebars-sections");

// const hbs = exphbs.create({ defaultLayout: "main" });
// exphbsSections(hbs);
// app.engine("handlebars", hbs.engine );
// app.set("view engine", "handlebars");

// Use the /public directory for static file loading.
app.use(express.static("public"));

// Register API Controllers.
const isAuthenticatedController = require("./middleware/isAuthenticatedController");
const { controllers, isAuthControllers } = require("../controllers");
app.use( "/api", controllers, isAuthenticatedController, isAuthControllers );

// Global middleware for routes registered after this.
app.use( require("./middleware/provideUserToViews.js"), require("./middleware/provideEnvToViews.js") );

// Register HTML routes last.
app.use( require("../routes") );

module.exports = app;