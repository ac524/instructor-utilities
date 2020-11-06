const sendUserVerifyEmail = require("./utils/sendUserVerifyEmail");

const { User, Token } = require("../models");

module.exports = {
    async resend(req, res) {

        try {

            const user = await User.findOne({ email: req.body.email });

            if( !user ) res.status(404).json({default: "Email not found"});

            await sendUserVerifyEmail( user );

            res.json({success: true});

        } catch(err) {
            
            console.log( err );

            return res.status(500).json({default: "Something went wrong"});

        }

    },
    async validate          (req, res) {

        try {

            const token = await Token.findOne({ token: req.params.token });

            if( !token ) return res.status(404).json({default: "Token not found"});
        
            const update = { isVerified: true };

            await User.findByIdAndUpdate( token.relation, update );

            req.app.get("io").to( token.relation ).emit("updateUser", update);
        
            res.json({ success: true });

        } catch {

            return res.status(500).json({default: "Something went wrong"});

        }

    }
}