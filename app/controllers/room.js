const crypto = require('crypto');
const mail = require('../config/utils/mail');

const { Classroom, Token } = require("../models");

const sendInvite = ( room, invite, from ) => {

    return mail.send(
        "invite",
        {
            name: from.name,
            roomName: room.name,
            inviteLink: `http://localhost:3000/invite/${invite.token.token}`
        },
        {
            to: invite.email,
            subject: `You've been invited to Classroom by ${from.name}!`
        }
    );

}

module.exports = {
    async getSingle( req, res ) {

        try {

            const room =
                await Classroom.findById( req.params.roomId )
                    .populate("staff.user")
                    .populate("students")
                    .populate("invites.token");

            if( req.userSocket ) req.userSocket.join( room._id );

            res.json( room );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    async update( req, res ) {

        try {

            if( req.roomStaffMember.role !== "instructor" ) return res.status(401).json({default:"You must be an instructor to update the class."});

            const updateList = [];

            // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

            ["name"].forEach( key => {
                if( req.body.hasOwnProperty(key) ) updateList.push( [ key,req.body[key] ] );
            });

            if( updateList.length )

                await Classroom.findByIdAndUpdate( req.roomId, Object.fromEntries( updateList ) );

            res.json({success:true});

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    async createInvite( req, res ) {

        try {

            const token = new Token({
                relation: req.params.roomId,
                token: crypto.randomBytes(16).toString('hex')
            });

            await token.save();

            const update = {
                $push: {
                    invites: {
                        email: req.body.email,
                        token: token._id
                    }
                }
            };

            const room =
                await Classroom
                    .findByIdAndUpdate( req.params.roomId, update, { new: true } )
                    .populate( 'invites.token' );

            const invite = room.invites[ room.invites.length - 1 ];

            await sendInvite( room, invite, req.user );

            res.json( invite );

        } catch( err ) {

            console.log( err );

            res.status(500).json({default:"Couldn't send invite"});

        }

    },
    async deleteInvite( req, res ) {

        try {

            // await Classroom.findByIdAndUpdate( req.params.roomId, { $pull: { invites: { _id: req.params.inviteId } } } );

            const room = await Classroom.findById( req.params.roomId );
            const invite = room.invites.id( req.params.inviteId );

            if( !invite ) res.status(404).json({default:"Invite not found"});

            await Token.findByIdAndDelete( invite.token );

            invite.remove();

            await room.save();

            res.json({ success: true });

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    }
}