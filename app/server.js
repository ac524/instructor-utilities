require("dotenv").config();

// MongoDB
require("./config/mongoose");

// Classroom app registry
require("./config/apps/register")();

// Express server configuration
const { addRoutes, listen } = require("./config/express");

addRoutes();

listen();