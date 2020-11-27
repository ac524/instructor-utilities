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

    strictCheck;
    looseCheck;

    /**
     * @param {string} name 
     * @param {object} schema 
     */
    constructor( name, schema ) {

        this.name = name;
        this.schema = {
            $$strict: "remove",
            ...schema
        };

    }

    clone(name, include) {

        return new ValidationSchema( name, selectSchema(this.schema, include) );
        
    }

    getStrict( include ) {

        if( !include )

            return this.strictCheck || ( this.strictCheck = vStrict( this.schema ) );
        
        return vStrict( selectSchema( this.schema, include ) );

    }

    getLoose( include ) {

        if( !include )

            return this.looseCheck || ( this.looseCheck = vLoose( this.schema ) );
        
        return vLoose( selectSchema( this.schema, include ) );

    }

    postHandler( include ) {
        return createBodyValidation( this.name, this.getStrict( include ) )
    }

    patchHandler( include ) {
        return createBodyValidation( this.name, this.getLoose( include ) )
    }

}

module.exports = ValidationSchema;