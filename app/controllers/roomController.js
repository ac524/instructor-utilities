const { Classroom } = require("../models");

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

            res.json( room );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    }
}