const { Router } = require("express");

const addRouterPath = require("./addRouterPath");

const createRouter = routes => {

    routes[0][1].p

    const router = new Router();

    for( routeConfig of routes ) addRouterPath( router, ...routeConfig );

    return router;

}

module.exports = createRouter;