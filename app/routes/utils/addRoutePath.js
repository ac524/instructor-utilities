const createControllerHandler = require("../middleware/createControllerHandler");
const setDefaultError = require("../middleware/setDefaultError");
const globalParamsValidation = require("../middleware/globalParamsValidation");
const isAuthenticated = require("../middleware/isAuthenticated");
const isVerified = require("../middleware/isVerified");

const addRequest = ( route, type, config ) => {

    const handlers = [];

    const {
        paramCheck,
        auth,
        defaultError,
        middleware,
        ctrl
    } = config;

    // Add params validation.
    if( paramCheck ) handlers.push( globalParamsValidation );

    // Configure default error message for errors.
    if( defaultError )  handlers.push( setDefaultError( `An error occured trying to ${defaultError}.` ) );

    // Add authentication.
    if( auth ) handlers.push( [ isAuthenticated, isVerified ] );

    // Add additional middleware.
    if( middleware ) handlers.push( middleware );

    // Add the Controller handler.
    handlers.push( Array.isArray(ctrl) ? createControllerHandler( ...ctrl ) : createControllerHandler( ctrl ) );

    route[type]( ...handlers );

}

const addRoutePath = ( router, path, requestTypes, sharedConfig = {} ) => {

    const route = router.route( path );

    Object.entries( requestTypes ).forEach( ([type, config]) => addRequest( route, type, { ...sharedConfig, ...config } ) );

};

module.exports = addRoutePath;