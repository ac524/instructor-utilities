const { Staff } = require("../../models");

const roomIoLoader = req => req.roomIo = req.app.get("io").to(req.roomId);

module.exports = async ( req, res, next ) => {

    try {

        const staffMember = await Staff.findOne( {
            user: req.user._id,
            classroom: req.roomId
        } );

        if( !staffMember )
        
            return res.status(401).json({ default: "You are not a member of this class" });

        roomIoLoader(req);

        next();

    } catch( err ) {

        res.status(500).json({ default: "Illegal Opperation" });

    }

}