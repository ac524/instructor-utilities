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

const {typeDefs, resolvers} = require("./config/graphql_schemas")

async function startExpressServer() {

    await addApolloServer(typeDefs, resolvers);

    addDataParsing();

    addCompression();

    addAuth();

    addRoutes();

    listen();
}

startExpressServer();