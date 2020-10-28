module.exports = async ( req, res, next ) => {

    if( !req.user.isVerified ) return res.status(401).json({ default: "Email is unverified." });

    next();

}