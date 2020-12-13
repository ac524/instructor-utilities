require("dotenv").config();


// MongoDB
require("./config/mongoose");

// Classroom app registry
require("./config/apps/register")();

// Express server configuration
const {
    addDataParsing,
    addCompression,
    addAuth,
    addRoutes,
    listen
} = require("./config/express");

addDataParsing();

addCompression();

addAuth();

addRoutes();

listen();