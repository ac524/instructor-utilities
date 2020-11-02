const crypto = require('crypto');
const mail = require('../config/utils/mail');

const { Token, Classroom, User } = require("../models");

const validateRegisterInput = require("../config/validation/register");
const passwordHash = require("../config/utils/passwordHash");
const ioEmit = require("./utils/ioEmit");

const addStaff = async (roomId, member) => {

    const { staff } =
        await Classroom
            .findByIdAndUpdate(roomId, { $push: { staff: member } }, {new:true})
            .select("staff")
            .populate("staff.user");

    return staff[ staff.length - 1 ];

}

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
    async create( req, res ) {

        try {

            const roomEmails = await Classroom.findById(req.roomId).populate('staff.user',"email").select("invites.email");

            // Check if the email is already registered to a staff member.
            if( roomEmails.staff.map( ({user}) => user.email ).includes( req.body.email ) )

                return res.status(400).json({ email: "This email is already registered to a staff member" });

            // Check if the email is already registered to an invite.
            if( roomEmails.invites && roomEmails.invites.map( ({email}) => email ).includes( req.body.email ) )

                return res.status(400).json({ email: "This email already has an invite." });

            const token = new Token({
                relation: req.roomId,
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
                    .findByIdAndUpdate( req.roomId, update, { new: true } )
                    .populate( 'invites.token' );

            const invite = room.invites[ room.invites.length - 1 ];

            if( mail.isEnabled ) await sendInvite( room, invite, req.user );

            res.json( invite );

        } catch( err ) {

            console.log( err );

            res.status(500).json({default:"Couldn't send invite"});

        }

    },
    /**
     * Delete an invite
     */
    async remove( req, res ) {

        try {

            const room = await Classroom.findById( req.roomId );
            const invite = room.invites.id( req.params.inviteId );

            if( !invite ) res.status(404).json({default:"Invite not found"});

            await Token.findByIdAndDelete( invite.token );

            invite.remove();

            await room.save();

            res.json({ success: true });

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    /**
     * Checks if an invite's email has a user.
     */
    async emailCheck( req, res ) {

        try {

            const user = await User.findOne({ email: req.userInvite.email });

            res.json({
                hasUser: Boolean( user ),
                email: req.userInvite.email
            });

        } catch(err) {

            console.log(err);

            res.status(500).json({ default: "Unable to process invitation" });

        }

    },
    /**
     * Register a User through an invite.
     */
    async register( req, res ) {

        try {

            const { errors, isValid } = validateRegisterInput(req.body, ["email","roomname","code"]);

            // Check validation
            if (!isValid)

                return res.status(400).json(errors);

            const existingUser = await User.findOne({ email: req.userInvite.email });

            if( existingUser )

                return res.status(400).json({ email: "Email already exists" });

            // Create the User
            const user = new User({
                name: req.body.name,
                email: req.userInvite.email,
                password: await passwordHash( req.body.password ),
                isVerified: true
            });

            await user.save();

            return res.json({ success: true });

        } catch(err) {

            res.status(500).json({ default: "Unable to process invitation" });

        }

    },
    /**
     * Accept the invitation to join a room.
     */
    async accept( req, res ) {

        try {

            const roomId = req.userInviteRoom._id;

            if( req.user.email !== req.userInvite.email )

                return res.status(401).json({default:"Please log into the correct account"});

            // Add the staff member to the classroom
            const staff = await addStaff( roomId, {
                role: "ta",
                user: req.user._id
            } );

            // Add the room to the user
            await req.user.update({ $push: { classrooms: roomId } });

            const addStaffDispatch = { type: "ADD_STAFF", payload: staff };
            ioEmit( req, "dispatch", addStaffDispatch, `room:${roomId}` );

            await req.userInviteToken.remove();

            req.userInvite.remove();

            await req.userInviteRoom.save();

            const deleteInviteDispatch = { type: "DELETE_INVITE", payload: req.userInvite._id };
            ioEmit( req, "dispatch", deleteInviteDispatch, `room:${roomId}` );

            res.json( { success: true, roomId: roomId } );

        } catch(err) {

            console.log(err);

            res.status(500).json({ default: "Unable to process invitation" });

        }

    }
}