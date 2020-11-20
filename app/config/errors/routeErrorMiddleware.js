const {
    InvalidDataError,
    InvalidUserError,
    NotFoundError,
    RouteError
} = require(".");

const handleRouteError = require("./handleRouteError");

/** 400 ERRORS **/

/**
 * @param {*} err 
 */
const mapValidationError = err => (new RouteError( 400, "Invalid submission data." )).setSourceErr( err );

/**
 * @param {InvalidDataError} err 
 */
const mapInvalidDataError = err => (new RouteError( 400, err.message, err.data )).setSourceErr( err );

/** 401 ERRORS **/

/**
 * @param {InvalidUserError} err 
 */
const mapInvalidUserError = err => (new RouteError( 401, err.message, err.data )).setSourceErr( err );

/** 404 ERRORS **/

/**
 * @param {NotFoundError} err 
 */
const mapNotFoundError = err => (new RouteError( 404, err.message, err.data )).setSourceErr( err );

const typeMap = {
    ValidationError: mapValidationError,
    InvalidDataError: mapInvalidDataError,
    InvalidUserError: mapInvalidUserError,
    NotFoundError: mapNotFoundError,
    default: ( message, err ) => (new RouteError(500, message)).setSourceErr(err)
}

const routeErrorMiddleware = (err, req, res, next) => {

    handleRouteError(
        (
            "RouteError" === err.constructor.name

                // Use the `err` as is if it is already a RouteError.
                ? err

                : (
                    typeMap.hasOwnProperty( err.constructor.name )
                        
                        // Use the matching map function if available.
                        ? typeMap[err.constructor.name](err)
                        
                        // Or resort to a default error map for unknown types.
                        : typeMap.default( req.defaultError || "Somthing went wrong", err )
                )
        ),
        res
    );

}

module.exports = routeErrorMiddleware;