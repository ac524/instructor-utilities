const { InvalidDataError } = require("../../config/errors");
const { compile, mapErrors } = require("../../config/validation/validator");

const validateParamsHandler = schema => {

    const check = compile(schema);

    return ( { params }, res, next ) => {

        if( !params ) return;

        const result = check( params );

        if( true === result ) return next();

        next( new InvalidDataError( `Invalid url`, mapErrors(result) ) );

    }

}

module.exports = validateParamsHandler;