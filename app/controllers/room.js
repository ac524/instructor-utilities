const crypto = require('crypto');

const { Classroom, Token } = require("../models");

module.exports = {
    async getSingle( req, res ) {

        try {

            const room =
                await Classroom.findById( req.params.roomId )
                    .populate({
                        path: 'staff',
                        populate: { path: 'user' }
                    })
                    .populate('students')
                    .populate('invites.token');

            if( req.userSocket ) req.userSocket.join( room._id );

            res.json( room );

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

            res.json( room.invites[ room.invites.length - 1 ] );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    }
    // async update( req, res ) {

    //     roomIo.emit("FromAPI", "Welcome to class!");

    //     res.json({success: true});

    // }
}