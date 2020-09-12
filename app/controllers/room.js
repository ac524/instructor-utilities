const { Classroom } = require("../models");

module.exports = {
    async getSingle( req, res ) {

        try {

            const room =
                await Classroom.findById( req.params.roomId )
                    .populate({
                        path: 'staff',
                        // Get friends of friends - populate the 'friends' array for every friend
                        populate: { path: 'user' }
                    })
                    .populate('students');

            if( req.userSocket ) req.userSocket.join( room._id );

            res.json( room );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    // async update( req, res ) {

    //     roomIo.emit("FromAPI", "Welcome to class!");

    //     res.json({success: true});

    // }
}