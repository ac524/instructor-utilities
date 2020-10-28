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

module.exports = {
    async setInvite( req, res, next ) {

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

    },
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
    async registerInvite( req, res ) {

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