// Import express and create a new server.
const http = require('http');
const express = require("express");
const passport = require("passport");
const getOption = require("../config/options");

const PORT = getOption( "port" );

const app = express();
const server = http.createServer(app);

const { RouteError, handleRouteError } = require("./errors/RouteError");

// Include data parsing middleware.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.use(express.static("client/build"));

app.use( require("../routes") );

app.use((err, req, res, next) => {

    switch( err.constructor.name ) {

        case "RouteError":
            handleRouteError(err, res);
            return;
        case "ValidationError":
            // TODO Build in Mongo DB Validation Error handler
        default:
            const defaultError = new RouteError(500, req.defaultError || "Somthing went wrong");

            defaultError.sourceErr = err;

            handleRouteError( defaultError, res );
    }

});

server.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`);
});

module.exports = app;