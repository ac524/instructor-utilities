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

const mapIncludes = schema => ( include, key ) => ({ ...include, [key]: schema[key] });

const selectSchema = (schema, include) => include.reduce( mapIncludes(schema), {} );

class ValidationSchema {

    /**
     * @param {string} name 
     * @param {object} schema 
     */
    constructor( name, schema ) {

        this.name = name;
        this.schema = schema;

    }

    postHandler( include ) {
        return createBodyValidation( this.name, vStrict( include ? selectSchema( this.schema, include ) : this.schema ) )
    }

    patchHandler( include ) {
        return createBodyValidation( this.name, vLoose( include ? selectSchema( this.schema, include ) : this.schema ) )
    }

}

module.exports = ValidationSchema;