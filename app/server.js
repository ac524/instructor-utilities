require("dotenv").config();

// MongoDB
require("./config/mongoose");

// Classroom app registry
require("./config/apps/register")();

// Email configuration
require("./config/sendgrid");

// Express server configuration
require("./config/express");