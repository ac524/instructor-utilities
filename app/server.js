require("dotenv").config();

require("./config/mongoose");

require("./config/apps/register")();

require("./config/express");