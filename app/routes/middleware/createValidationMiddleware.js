const createValidationMiddleware = ( validations, message = "Invalid submission data." ) => ( req, res, next ) => {

    const errors = new Map();

    for( validation of validations ) validation( errors, req );

    errors.size
    
        ? next( new InvalidDataError( message, Object.fromEntries([ ...errors ]) ) )
        
        : next();

}