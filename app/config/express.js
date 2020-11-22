// Import express and create a new server.
const http = require('http');
const express = require("express");
const passport = require("passport");
const getOption = require("../config/options");
const routeErrorMiddleware = require("./errors/routeErrorMiddleware");

const PORT = getOption( "port" );

const app = express();
const server = http.createServer(app);


// Include data parsing middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const io = require("./io")(server, app);

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
app.use(express.static("client/build"));

const addRoutes = () => {

    app.use( require("../routes") );

    app.use( routeErrorMiddleware );

}

const listen = () => {

    server.listen(PORT, () => {
        console.log(`App listening on Port: ${PORT}`);
    });    

}

module.exports = {
    addRoutes,
    listen,
    app,
    io
};