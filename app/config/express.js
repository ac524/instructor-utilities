// Import express and create a new server.
const http = require('http');
const express = require("express");
const passport = require("passport");
var cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);

// Include data parsing middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

require("./io")(server, app);

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

// Register routes
app.use( require("../routes") );

server.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`);
});

module.exports = app;