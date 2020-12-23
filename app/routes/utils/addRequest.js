const ValidationSchema = require("~crsm/config/validation/ValidationSchema");
const PermissionSet = require("~crsm/config/permissions/PermissionSet");
const SchemaController = require("~crsm/controllers/types/SchemaController");
const SubSchemaController = require("~crsm/controllers/types/SubSchemaController");

const createControllerHandler = require("../middleware/createControllerHandler");
const createCheckPermission = require("../middleware/createCheckPermission");
const setDefaultError = require("../middleware/setDefaultError");
const globalParamsValidation = require("../middleware/globalParamsValidation");
const isAuthenticated = require("../middleware/isAuthenticated");
const isVerified = require("../middleware/isVerified");

const validationMap = {
    post: validation => validation.postHandler(),
    patch: validation => validation.patchHandler()
}

const schemaCtrlMap = {
    post: ctrl => [ ctrl.binding.createOne, {
        keyMap: {
            body: "data"
        }
    } ],
    get: ctrl => [ ctrl.binding.findOne, {
        keyMap: {
            [ctrl.key]: "doc",
            [`${ctrl.key}Id`]: "docId",
        }
    } ],
    patch: ctrl => [ ctrl.binding.updateOne, {
        keyMap: {
            body: "data",
            [ctrl.key]: "doc",
            [`${ctrl.key}Id`]: "docId",
        }
    } ],
    delete: ctrl => [ ctrl.binding.deleteOne, {
        keyMap: {
            [ctrl.key]: "doc",
            [`${ctrl.key}Id`]: "docId",
        }
    } ]
}

const subSchemaCtrlMap = {
    post: subCtrl => [ subCtrl.binding.createOne, {
        keyMap: {
            body: "data",
            [`${subCtrl.ctrl.key}Id`]: "belongsTo"
        }
    } ],
    get: subCtrl => [ subCtrl.binding.findOne, {
        keyMap: {
            [`${subCtrl.key}Id`]: "docId",
        }
    } ],
    patch: subCtrl => [ subCtrl.binding.updateOne, {
        keyMap: {
            body: "data",
            [`${subCtrl.key}Id`]: "docId",
        }
    } ],
    delete: subCtrl => [ subCtrl.binding.deleteOne, {
        keyMap: {
            [`${subCtrl.key}Id`]: "docId",
        }
    } ]
}

const permMap = {
    get: "view",
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

    if( validation && validationMap[type] ) handlers.push( validationMap[type]( validation ) );

    // Add additional middleware.
    if( middleware ) handlers.push( middleware );

    if( permission )

        handlers.push( createCheckPermission( typeof permission === "string" ? permission : permission[ permMap[type] ] ) );

    if( ctrl instanceof SchemaController ) {

        handlers.push( createControllerHandler( ...schemaCtrlMap[type]( ctrl ) ) );

    } else if( ctrl instanceof SubSchemaController ) {

        handlers.push( createControllerHandler( ...subSchemaCtrlMap[type]( ctrl ) ) );

    } else {

        // Add the Controller handler.
        handlers.push( Array.isArray(ctrl) ? createControllerHandler( ...ctrl ) : createControllerHandler( ctrl ) );

    }

    route[type]( ...handlers );

}

module.exports = addRequest;