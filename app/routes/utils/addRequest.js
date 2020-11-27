const createControllerHandler = require("../middleware/createControllerHandler");
const createCheckPermission = require("../middleware/createCheckPermission");
const setDefaultError = require("../middleware/setDefaultError");
const globalParamsValidation = require("../middleware/globalParamsValidation");
const isAuthenticated = require("../middleware/isAuthenticated");
const isVerified = require("../middleware/isVerified");
const ValidationSchema = require("../../validation/ValidationSchema");
const PermissionSet = require("../../config/permissions/PermissionSet");

const validationMap = {
    post: validation => validation.postHandler(),
    patch: validation => validation.patchHandler()
}

const permMap = {
    get: "get",
    post: "create",
    patch: "update",
    delete: "delete"
}

/**
 * @typedef AddRequestConfig
 * @property {boolean} config.paramCheck
 * @property {boolean} config.auth
 * @property {string} config.defaultError
 * @property {string|PermissionSet} config.permission
 * @property {ValidationSchema} config.validation
 */

/**
 * @param {*} route 
 * @param {*} type 
 * @param {AddRequestConfig} config 
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

    if( validation && validationMap[type] ) validationMap[type]( validation );

    // Add additional middleware.
    if( middleware ) handlers.push( middleware );

    if( permission )

        handlers.push( createCheckPermission( typeof permission === "string" ? permission : permission[ permMap[type] ] ) );

    // Add the Controller handler.
    handlers.push( Array.isArray(ctrl) ? createControllerHandler( ...ctrl ) : createControllerHandler( ctrl ) );

    route[type]( ...handlers );

}

module.exports = addRequest;