const { Classroom } = require("../models");
// const io = require("../config/io");

module.exports = {
    async getRoom( req, res ) {

        try {

            const room =
                await Classroom.findById( req.params.roomId )
                    .populate({
                        path: 'staff',
                        // Get friends of friends - populate the 'friends' array for every friend
                        populate: { path: 'user' }
                    })
                    .populate('students');

            // io.to( req.params.roomId ).emit("Welcome to class!");

            res.json( room );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    }
}