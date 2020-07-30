// This is middleware automatically injects the user into the available data for each view.
module.exports = (req, res, next) => {

    // If the user is logged in, add their object to the response 'locals' for use in view files.
    const env = process.env.NODE_ENV || 'development';

    res.locals.isDevelopment = env === 'development';
    res.locals.isProduction = env === 'production';

    return next();

};