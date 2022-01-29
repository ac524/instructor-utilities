const authorization = require('./authentication');
const db = require('./db');

const createContext = ( { req } ) => {

    return [
        db,
        authorization
    ].reduce(( context, partial ) => ({
        ...context,
        // Extend context with the partial
        ...( partial( req, context ) || {} )
    }), {});

}

module.exports = createContext;