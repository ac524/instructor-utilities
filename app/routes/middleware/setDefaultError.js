const setDefaultError = ( message ) => ( req, res, next ) => {

    req.defaultError = message;

    next();

}

module.exports = setDefaultError;