const { Router } = require("express");

const addRouterPath = require("./addRouterPath");

const createRouter = routes => {

    const router = new Router();

    for( routeConfig of routes ) addRouterPath( router, ...routeConfig );

    return router;

}

module.exports = createRouter;