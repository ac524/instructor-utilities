const { Classroom } = require("../models");

module.exports = {
    async update( req, res ) {
        try {
            
            const updateList = [];

            // TODO - Email updates should not be automatic, instead there needs to be a verification process for the new email.

            ["name", "email"].forEach( key => {
                if( req.body.hasOwnProperty(key) ) updateList.push( [ key,req.body[key] ] );
            });

            if( updateList.length )

                await req.user.update( Object.fromEntries( updateList ) );

            res.json({success: true});

        } catch(err) {

            res.status(500).json({ default: "Unable to update user." });

        }
    },
    async roomNames( req, res ) {
        try {

            res.json( await Classroom.find({ _id: { $in: req.user.classrooms } }).select("name") );

        } catch(err) {

            res.status(500).json({ default: "Unable to get user's room names." });

        }
    }
};