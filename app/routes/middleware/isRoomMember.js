const { Staff } = require("../../models");

module.exports = async ( req, res, next ) => {

    try {

        const staffMember = await Staff.findOne( {
            user: req.user._id,
            classroom: req.roomId
        } );

        if( !staffMember )
        
            return res.status(401).json({ default: "You are not a member of this class" });

        next();

    } catch( err ) {

        res.status(500).json({ default: "Illegal Opperation" });

    }

}