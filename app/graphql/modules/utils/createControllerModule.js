const { createModule } = require('graphql-modules');
const { useRoomMemberPermissions } = require("../../middleware");

/**
 * @typedef ControllerArgs
 * @property {String} [docId]
 * 
 * Tranlates `args` from graphql into appropiate options for controllers
 * @callback controllerAgsTranslator
 * @param {Object} args 
 * @returns {ControllerArgs}
 * 
 * Extract and tranlate appropiate object keys from `args` into object keys for calling controller methods.
 * @param {String} key 
 * @returns {controllerAgsTranslator}
 */
const createControllerArgsTranslator = key =>
    args => {
        const {
            // Translate model name based arg keys to model methods argument names
            [`${key}Id`]: docId,
            data
        } = args;

        return {
            ...(docId ? { docId } : {}),
            ...(data ? { data } : {})
        }
    }

/**
 * A simple definition of a graphql resolver method. TODO Can we find and import from graphql library?
 * @callback graphqlResolver
 * @param {*} parent
 * @param {Object} args
 * @param {Object} context
 * @param {*} info
 * @returns {*}
 * 
 * Creates a resolver for a given controller method
 * 
 * @param {String} modelName 
 * @param {String} method 
 * @param {controllerAgsTranslator} argsTranslator 
 * @returns {graphqlResolver}
 */
const createControllerResolver =
    ( modelName, method, argsTranslator ) =>
        (...[,args,{db}]) =>
            db.get( modelName )[ method ]( argsTranslator ? argsTranslator( args ) : args );

/**
 * @typedef MemberPermissionConfig
 * @property {String} context Method name of setRoomContext to use in loading the room context for the member
 * @property {String} set The key for the permission set to use
 * 
 * @see /app/graphql/middleware/setRoomContext
 * @see /app/config/permissions/sets
 * 
 * @typedef ControllerModuleConfigOnly
 * @property {String} id Name of the controller to build a module for
 * @property {String} argsKey Base name of `args` properties in graphql
 * @property {Array} abilites Array list of abilities to configure (Ex: "view", "create", "update", "delete")
 * @property {MemberPermissionConfig} memberPermission Base name of `args` properties in graphql
 * 
 * @typedef {import('graphql-modules').ModuleConfig & ControllerModuleConfigOnly} ControllerModuleConfig
 * 
 * Creates a Module in a framworked manner given abilites and other configuration.
 * @param {ControllerModuleConfig} param0 
 * @returns {import('graphql-modules').Module}
 */
const createControllerModule = ({
    id,
    middlewares = {},
    resolvers = {},
    typeDefs,
    argsKey,
    abilites,
    memberPermission,
    ...params
}) => {

    // Camel cased id
    const idKey = id.toLowerCase().split('.').map((part,i) =>i?part[0].toUpperCase()+part.slice(1):part).join('');
    const IdKey = idKey[0].toUpperCase()+idKey.slice(1);

    if( !argsKey ) argsKey = idKey;

    const queryResolvers = { ...(resolvers.Query ? resolvers.Query : {}) };
    const queryMiddlewares = { ...(middlewares.Query ? middlewares.Query : {}) };
    const mutationResolvers = { ...(resolvers.Mutation ? resolvers.Mutation : {}) };
    const mutationMiddlewares = { ...(middlewares.Mutation ? middlewares.Mutation : {}) };

    const argsTranslator = createControllerArgsTranslator( idKey );

    for( ability of abilites ) {

        let isQuery = false;
        let entryPoint;
        let method;

        switch( ability ) {

            case "view":

                isQuery = true;
                entryPoint = idKey;
                method = 'findOne';
                break;

            // TODO Build cases for "create", "update", and "delete"

            case "create":

                entryPoint = `create${IdKey}`;
                method = 'createOne';
                break;

            case "update":

                entryPoint = `update${IdKey}`;
                method = 'updateOne';
                break;

            case "delete":

                entryPoint = `delete${IdKey}`;
                method = 'deleteOne';
                break;

            // TODO Create a default case for handling custom abilities

        }

        const resolvers = isQuery ? queryResolvers : mutationResolvers;
        
        resolvers[entryPoint] || (resolvers[entryPoint] = createControllerResolver( id, method, argsTranslator ));

        if( memberPermission ) {
            const mutations = isQuery ? queryMiddlewares : mutationMiddlewares;
            mutations[entryPoint] || (mutations[entryPoint] = useRoomMemberPermissions( {  ...memberPermission, ability } ));
        }
    }

    return createModule({
        id,
        typeDefs,
        middlewares: {
            ...middlewares,
            ...(Object.keys(queryMiddlewares).length ? { Query: queryMiddlewares } : {}),
            ...(Object.keys(mutationMiddlewares).length ? { Mutation: mutationMiddlewares } : {})
        },
        resolvers: {
            ...resolvers,
            ...(Object.keys(queryResolvers).length ? { Query: queryResolvers } : {}),
            ...(Object.keys(mutationResolvers).length ? { Mutation: mutationResolvers } : {})
        },
        ...params
    });

}

exports.createControllerArgsTranslator = createControllerArgsTranslator;
exports.createControllerResolver = createControllerResolver;
exports.createControllerModule = createControllerModule;