const isProd = require("../options")("isProd");

/**
 * @param {RouteError} err 
 * @param {*} res 
 */
const handleRouteError = (err, res) => {

    // Log for non production environments.
    // if( !isProd )
    console.log( err.sourceErr || err );

    const { statusCode, response } = err;

    res.status( statusCode ).json( response );

};

module.exports = handleRouteError;