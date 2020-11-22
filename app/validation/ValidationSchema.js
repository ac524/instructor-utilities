const { compile, mapErrors } = require("./validator");

const { InvalidDataError } = require("../config/errors");

// Validate schema as is.
const vStrict = schema => compile(schema);

// Set all items to optional.
const vLoose = schema => compile(
    Object.fromEntries(
        Object.entries(schema)
            .map( ([key,value]) => [key, { ...((typeof value === "string") ? { type: value } : value), optional: true } ] )
    )
);

const createBodyValidation = (name, check) => ( req, res, next ) => {

    const result = check( req.body );

    if( true === result ) return next();

    next( new InvalidDataError( `Invalid ${name} information`, mapErrors(result) ) );

}

class ValidationSchema {

    /**
     * @param {string} name 
     * @param {object} schema 
     */
    constructor( name, schema ) {

        this.name = name;
        this.schema = schema;

    }

    postHandler() {
        return createBodyValidation( this.name, vStrict( this.schema ) )
    }

    patchHandler() {
        return createBodyValidation( this.name, vLoose( this.schema ) )
    }

}

module.exports = ValidationSchema;