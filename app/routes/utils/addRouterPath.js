const addRequest = require("./addRequest");

const addRouterPath = ( router, path, requestTypes, sharedConfig = {} ) => {

    const route = router.route( path );

    Object.entries( requestTypes ).forEach( ([type, config]) => addRequest( route, type, { ...sharedConfig, ...config } ) );

};

module.exports = addRouterPath;