const { createModule } = require('graphql-modules');
const { useRoomMemberPermissions } = require("../../middleware");

/**
 * Extract and tranlate appropiate object keys from `args` into object keys for calling controller methods.
 * @param {String} key 
 * @returns 
 */
const createControllerArgsTranslator = key => args => {
    const {
        // Translate model name based arg keys to model methods argument names
        [`${key}Id`]: docId,
    } = args;

    return {
        ...(docId ? { docId } : {})
    }
}

const createControllerResolver =
    ( modelName, method, argsTranslator ) =>
        (...[,args,{db}]) =>
            db.get( modelName )[ method ]( argsTranslator ? argsTranslator( args ) : args );

const createControllerModule = ({
    id,
    dirname,
    typeDefs,
    argsKey,
    abilites,
    memberPermission,
    middlewares = {},
    resolvers = {},
    ...params
}) => {

    // Camel cased id
    const idKey = id.toLowerCase().split('.').map((part,i) =>i?part[0].toUpperCase()+part.slice(1):part).join('');

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

            // TODO Create a default case for handling custom abilities

        }

        (isQuery ? queryResolvers : mutationResolvers)[entryPoint] = createControllerResolver( id, 'findOne', argsTranslator );

        if( memberPermission )

            (isQuery ? queryMiddlewares : mutationMiddlewares)[entryPoint] = useRoomMemberPermissions( {  ...memberPermission, type: ability } );

    }

    return createModule({
        id,
        dirname,
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