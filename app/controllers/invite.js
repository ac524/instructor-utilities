const { Token, Classroom, User, Staff } = require("../models");

const validateRegisterInput = require("../config/validation/register");
const passwordHash = require("../config/utils/passwordHash");

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

            const { errors, isValid } = validateRegisterInput(req.body, ["email","roomname"]);

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

            if( req.user.email !== req.userInvite.email )

                return res.status(401).json({default:"Please log into the correct account"});
            
            // Create the user's staff entry for the classroom
            const staff = new Staff({
                role: "ta",
                user: req.user._id,
                classroom: req.userInviteRoom._id
            });

            await staff.save();

            // Add the staff member to the classroom
            await req.userInviteRoom.update({ $push: { staff: staff._id } });

            // Add the room to the user
            await req.user.update({ $push: { classrooms: req.userInviteRoom._id } });

            await req.userInviteToken.remove();

            req.userInvite.remove();

            await req.userInviteRoom.save();

            res.json( { success: true, roomId: req.userInviteRoom._id } );

        } catch(err) {

            console.log(err);

            res.status(500).json({ default: "Unable to process invitation" });

        }

    }
}