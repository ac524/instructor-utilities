const { App, Classroom } = require("../models");

module.exports = {
    async getSingle( req, res ) {

        try {

            // const room =
            //     await Classroom.findById( req.params.roomId )
            //         .populate({
            //             path: 'staff',
            //             // Get friends of friends - populate the 'friends' array for every friend
            //             populate: { path: 'user' }
            //         })
            //         .populate('students');

            // const classroomIo = req.app.get("classroomIo");

            // classroomIo.to(req.params.roomId).emit("FromAPI", "Welcome to class!");

            res.json( {} );

        } catch( err ) {

            res.status(500).json({default:"Something went wrong"});

        }

    },
    async create( req, res ) {

        const newApp = new App({
            room: req.roomId,
            type: req.body.type,
            data: req.body.data
        });

        await newApp.save();

        await Classroom.findByIdAndUpdate( req.roomId, { $push: apps._id } );

        req.roomIo.emit( "dispatch", {
            type: "ADD_APP",
            payload: newApp._id
        } );

        res.json({success: true});

    }
}