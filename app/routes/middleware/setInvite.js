const { Token, Classroom } = require("../../models");

const setInvite = async ( req, res, next ) => {

    try {

        req.userInviteToken = await Token.findOne({ token: req.params.token });

        if( !req.userInviteToken ) return res.status(404).json({default: "This invitation is no longer available"});

        req.userInviteRoom = await Classroom.findById( req.userInviteToken.relation );

        if( !req.userInviteRoom ) return res.status(400).json({default: "This invitation is not longer valid"});

        req.userInvite = req.userInviteRoom.invites.find( invite => invite.token.equals( req.userInviteToken._id ) );

        if( !req.userInvite ) return res.status(400).json({default: "This invitation is not longer valid"});

        next();

    } catch(err) {

        console.log(err);

        res.status(500).json({ default: "Unable to process invitation" });

    }

}

module.exports = setInvite;