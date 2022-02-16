require("dotenv").config();

// MongoDB
require("./config/mongoose");

// Classroom app registry
require("./config/apps/register")();

// Express server configuration
const {
    addApolloServer,
    addDataParsing,
    addCompression,
    addAuth,
    addRoutes,
    listen
} = require("./config/express");

const { schema, context } = require("./graphql");

const apiType = require("./config/options")('apiType')

async function startExpressServer() {

    if( apiType === 'BOTH' || apiType === 'GRAPHQL' ) await addApolloServer(schema, context);

    addDataParsing();

    addCompression();

    addAuth();

    addRoutes();

    listen();
    
}

startExpressServer();