const { Token, Room } = require("../../models");
const { InvalidDataError, NotFoundError } = require("../../config/errors");

const setInvite = async ( req, res, next ) => {

    try {

        const inviteToken = await Token.findOne({ token: req.params.token });

        // req.userInviteToken = await Token.findOne({ token: req.params.token });

        if( !inviteToken ) throw new NotFoundError( "This invitation is no longer available" );

        const inviteRoom = await Room.findById( inviteToken.relation );

        if( !inviteRoom )  throw new InvalidDataError( "This invitation is not longer valid" );

        const invite = inviteRoom.invites.find( invite => invite.token.equals( inviteToken._id ) );

        if( !invite ) throw new InvalidDataError( "This invitation is not longer valid" );

        req.crdata.set( "inviteToken", inviteToken );
        req.crdata.set( "inviteRoom", inviteRoom );
        req.crdata.set( "invite", invite );

        next();

    } catch(err) {

        next( err );

    }

}

module.exports = setInvite;