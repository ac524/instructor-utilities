const { Token, Classroom } = require("../models");
const User = require("../models/User");

module.exports = {
    async setInvite( req, res, next ) {

        try {

            const token = await Token.findOne({ token: req.params.token });
    
            if( !token ) return res.status(404).json({default: "Invitation Expired"});
    
            const room = await Classroom.findById( token.relation );
    
            if( !room ) return res.status(400).json({default: "This invitation is not longer valid"});
    
            const invite = room.invites.find( invite => invite.token.toString() === token._id.toString() );
    
            if( !invite ) return res.status(400).json({default: "This invitation is not longer valid"});
    
            req.roomInvite = invite;

            next();

        } catch(err) {

            res.status(500).json({ default: "Unable to process invitation" });

        }

    },
    async emailCheck( req, res ) {

        try {

            const user = await User.findOne({ email: req.roomInvite.email });

            res.json({
                hasUser: Boolean( user ),
                email: req.roomInvite.email
            });

        } catch(err) {

            res.status(500).json({ default: "Unable to process invitation" });

        }

    },
    async accept( req, res ) {

        try {
    
            res.json( req.roomInvite );

        } catch(err) {

            res.status(500).json({ default: "Unable to process invitation" });

        }

    }
}