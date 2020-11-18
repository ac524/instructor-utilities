const isProd = require("../options")("isProd");

class RouteError extends Error {

    statusCode;
    message;
    data;
    sourceErr;

    constructor(statusCode, message, data) {

        super();
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

    }

    get response() {
        return {
            default: this.message,
            ...this.data
        }
    }

}

/**
 * @param {RouteError} err 
 * @param {*} res 
 */
const handleRouteError = (err, res) => {

    // Log for non production environments.
    if( !isProd ) console.log( err.sourceErr || err );

    const { statusCode, response } = err;

    res.status( statusCode ).json( response );

};

module.exports = {
    RouteError,
    handleRouteError
}