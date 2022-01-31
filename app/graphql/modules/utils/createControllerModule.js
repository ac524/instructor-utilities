const createControllerArgsTranslator = key => args => {
    const {
        // Translate model name based arg keys to model methods argument names
        [`${key}Id`]: docId,
        ...otherArgs
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
    permissions,
    // TODO accept custom `middlewares` and `resolves`
    ...params
}) => {

    // Camel cased id
    const idKey = id.toLowerCase.split('.').map((part,i) =>i?part[0].toUpperCase()+part.slice(1):part).join('');

    if( !argsKey ) argsKey = idKey;

    const queryResolvers = {};
    const queryMiddlewares = {};
    const mutationResolvers = {};
    const mutationMiddlewares = {};

    const argsTranslator = createControllerArgsTranslator( idKey );

    for( ability of abilites ) {

        switch(ability) {
            case "view":

                // TODO Extend `queryResolvers` and `queryMiddlewares` with appropriate configuration
                queryResolvers[idKey] = createControllerResolver( id, 'findOne', argsTranslator );

                break;
        }

    }

    return createModule({
        id,
        dirname,
        typeDefs,
        // TODO extend and add `middlewares` and `resolves` configuration created above
        ...params
    });

}

exports.createControllerArgsTranslator = createControllerArgsTranslator;
exports.createControllerResolver = createControllerResolver;
exports.createControllerModule = createControllerModule;