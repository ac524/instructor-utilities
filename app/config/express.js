// Import express and create a new server.
const http = require('http');
const express = require("express");
const passport = require("passport");
const getOption = require("../config/options");
const routeErrorMiddleware = require("./errors/routeErrorMiddleware");
const {ApolloServer} = require('apollo-server-express');

const jwt = require('jsonwebtoken');
const secret = require("../config/options")( "secret" );
console.log(secret);

const PORT = getOption( "port" );

const app = express();
const server = http.createServer(app);

const io = require("./io")(server);

const addApolloServer = async (typeDefs, resolvers) => {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ( {req} ) => {
            let token = req.headers.authorization;
            
            if (req.headers.authorization) {
                token = token.split(' ').pop().trim();
            }
    
            if (!token) {
                return req;
            }

            try {
                const data = jwt.verify(token, secret, { maxAge: 31556926 });
                req.user = data;
            } catch (err) {
                console.error(err)
            }
    
            return req;
        }
    });

    await apolloServer.start();
    apolloServer.applyMiddleware( {app} );

    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
}

const addDataParsing = () => {
    // Include data parsing middleware.
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
}

const addCompression = () => {
    const compression = require("compression");
    // TODO Research usage of this compression. Does it work for client side requests?
    // const msgpack = require("express-msgpack");
    
    // gzip compression.
    app.use(compression());
    // msgpack compression for json.
    // app.use(msgpack());
}

const addAuth = () => {
    app.use(passport.initialize());
    // Passport config
    passport.use( require("./jwtstrategy") );
}



const addRoutes = () => {

    // Use the /public directory for static file loading.
    app.use(express.static("public"));
    app.use(express.static("client/build"));

    app.use( require("../routes") );

    app.use( routeErrorMiddleware );

}

const listen = () => {

    server.listen(PORT, () => {
        console.log(`App listening on Port: ${PORT}`);
    });    

}

module.exports = {
    addApolloServer,
    addDataParsing,
    addCompression,
    addAuth,
    addRoutes,
    listen,
    app,
    io
};