const createControllerHandler = require("../middleware/createControllerHandler");
const createCheckPermission = require("../middleware/createCheckPermission");
const setDefaultError = require("../middleware/setDefaultError");
const globalParamsValidation = require("../middleware/globalParamsValidation");
const isAuthenticated = require("../middleware/isAuthenticated");
const isVerified = require("../middleware/isVerified");
const ValidationSchema = require("../../validation/ValidationSchema");

/**
 * @param {*} route 
 * @param {*} type 
 * @param {object} config 
 * @param {boolean} config.paramCheck
 * @param {boolean} config.auth
 * @param {string} config.defaultError
 * @param {array} config.permission
 * @param {ValidationSchema} config.validation
 */
const addRequest = ( route, type, config ) => {

    const handlers = [];
    
    const {
        paramCheck,
        auth,
        defaultError,
        middleware,
        validation,
        permission,
        ctrl
    } = config;

    // Add params validation.
    if( paramCheck ) handlers.push( globalParamsValidation );

    // Configure default error message for errors.
    if( defaultError )  handlers.push( setDefaultError( `An error occured trying to ${defaultError}.` ) );

    // Add authentication.
    if( auth ) handlers.push( [ isAuthenticated, isVerified ] );

    if( validation ) {
        switch( type ) {
            case "post":
                handlers.push( validation.postHandler() );
                break;
            case "patch":
                handlers.push( validation.patchHandler() );
                break;
        }
    }

    // Add additional middleware.
    if( middleware ) handlers.push( middleware );

    if( permission ) handlers.push( createCheckPermission( ...permission ) );

    // Add the Controller handler.
    handlers.push( Array.isArray(ctrl) ? createControllerHandler( ...ctrl ) : createControllerHandler( ctrl ) );

    route[type]( ...handlers );

}

module.exports = addRequest;