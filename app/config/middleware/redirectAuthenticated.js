// This is middleware send a logged in user to the main user page
module.exports = (req, res, next) => {

    // If the user is logged in, add their object to the response 'locals' for use in view files.
    if (req.user)

        return res.redirect("/lists");

    return next();

};