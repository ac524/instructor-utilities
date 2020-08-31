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

            const classroomIo = req.app.get("classroomIo");

            classroomIo.to(req.params.roomId).emit("FromAPI", "Welcome to class!");

            console.log( 'GET', req.params.roomId );

            res.json( room );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    async update( req, res ) {

        const classroomIo = req.app.get("classroomIo");

        classroomIo.to(req.params.roomId).emit("FromAPI", "Welcome to class!");

        res.json({success: true});

    }
}