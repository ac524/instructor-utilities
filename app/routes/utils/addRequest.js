const ValidationSchema = require("../validation/ValidationSchema");
const PermissionSet = require("../../config/permissions/PermissionSet");
const SchemaController = require("../../controllers/types/SchemaController");
const SubSchemaController = require("../../controllers/types/SubSchemaController");

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
            body: "data",
            user: "createdBy"
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
            [`${subCtrl.modelCtrl.key}Id`]: "belongsTo",
            user: "createdBy"
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

const parseCtrl = ( type, ctrl, ctrlFilter = ctrl => ctrl ) => {

    let createConfig;

    if( ctrl instanceof SchemaController )

        createConfig = schemaCtrlMap[type]( ctrl );

    else if( ctrl instanceof SubSchemaController )

        createConfig = subSchemaCtrlMap[type]( ctrl );

    else
        
        createConfig = ctrl;

    return ctrlFilter( createConfig );

}

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
        unverified,
        defaultError,
        middleware,
        validation,
        permission,
        ctrl,
        ctrlFilter
    } = config;

    // Add params validation.
    if( paramCheck ) handlers.push( globalParamsValidation );

    // Configure default error message for errors.
    if( defaultError )  handlers.push( setDefaultError( `An error occured trying to ${defaultError}.` ) );

    // Add authentication.
    if( auth ) {
        handlers.push( isAuthenticated );
        if( !unverified ) handlers.push( isVerified );
    }

    if( validation && validationMap[type] ) handlers.push( validationMap[type]( validation ) );

    // Add additional middleware.
    if( middleware ) handlers.push( middleware );

    if( permission )

        handlers.push( createCheckPermission( typeof permission === "string" ? permission : permission[ permMap[type] ] ) );

    let createConfig = parseCtrl( type, ctrl, ctrlFilter );

    // Add the Controller handler.
    handlers.push( Array.isArray(createConfig) ? createControllerHandler( ...createConfig ) : createControllerHandler( createConfig ) );

    route[type]( ...handlers );

}

module.exports = addRequest;