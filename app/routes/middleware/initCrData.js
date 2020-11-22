const initCrData = ( req, res, next ) => {

    req.crdata = new Map();
    next();

}

module.exports = initCrData;