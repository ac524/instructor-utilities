const { Token, Classroom } = require("../../models");
const { InvalidDataError, NotFoundError } = require("../../config/errors");

const setInvite = async ( req, res, next ) => {

    try {

        const userInviteToken = await Token.findOne({ token: req.params.token });

        // req.userInviteToken = await Token.findOne({ token: req.params.token });

        if( !userInviteToken ) throw new NotFoundError( "This invitation is no longer available" );

        const userInviteRoom = await Classroom.findById( userInviteToken.relation );

        if( !userInviteRoom )  throw new InvalidDataError( "This invitation is not longer valid" );

        const userInvite = req.userInviteRoom.invites.find( invite => invite.token.equals( req.userInviteToken._id ) );

        if( !userInvite ) throw new InvalidDataError( "This invitation is not longer valid" );

        req.crdata.set( "inviteToken", userInviteToken );
        req.crdata.set( "inviteRoom", userInviteRoom );
        req.crdata.set( "invite", userInvite );

        next();

    } catch(err) {

        next( err );

    }

}

module.exports = setInvite;