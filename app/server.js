require("dotenv").config();

// MongoDB
require("./config/mongoose");

// Classroom app registry
require("./config/apps/register").default();

// Express server configuration
require("./config/express");