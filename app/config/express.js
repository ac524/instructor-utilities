// Import express and create a new server.
const express = require("express");
const passport = require("passport");

const app = express();

// Include data parsing middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const compression = require("compression");
// TODO Research usage of this compression. Does it work for client side requests?
// const msgpack = require("express-msgpack");

// gzip compression.
app.use(compression());
// msgpack compression for json.
// app.use(msgpack());

app.use(passport.initialize());
// Passport config
passport.use( require("./jwtstrategy") );

// Use the /public directory for static file loading.
app.use(express.static("public"));

// Register API Controllers.
// const isAuthenticatedController = require("./middleware/isAuthenticatedController");
const { controllers/*, isAuthControllers*/ } = require("../controllers");
app.use( "/api", controllers/*, isAuthenticatedController, isAuthControllers */ );

// Register HTML routes last.
app.use( require("../routes") );

module.exports = app;