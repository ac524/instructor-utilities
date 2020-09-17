const { Student, Classroom } = require("../models");

/**
 * All routes require isRoomMember middleware for authentication
 */
module.exports = {
    async create( req, res ) {

        try {

            const newStudent = new Student({
                name: req.body.name,
                priorityLevel: req.body.priorityLevel,
                assignedTo: req.body.assignedTo,
                classroom: req.roomId
            });

            await newStudent.save();

            await Classroom.findByIdAndUpdate( req.roomId, { $push: { students: newStudent._id } } );

            req.roomIo.emit( "dispatch", {
                type: "ADD_STUDENT",
                payload: newStudent
            } );

            res.json( { success: true } );
                
        } catch(err) {

            res.status(500).json({ default: "Unable to create student." });

        }

    },
    async getSingle( req, res ) {

        try {

            const student = await Student.findById( req.params.studentId );

            if( !student )

                res.status(404).json({ default: "Student not found." });

            res.json( student );
                
        } catch(err) {

            res.status(500).json({ default: "Unable to get student." });

        }

    },
    async update( req, res ) {

        const update = {
            name: req.body.name,
            priorityLevel: req.body.priorityLevel,
            assignedTo: req.body.assignedTo
        };

        try {

            const student = await Student.findByIdAndUpdate( req.params.studentId, update, {new: true} );

            if( !student )

                res.status(404).json({ default: "Student not found." });

            req.roomIo.emit( "dispatch", {
                type: "UPDATE_STUDENT",
                payload: student
            } );

            res.json({ success: true });
                
        } catch(err) {

            res.status(500).json({ default: "Unable to create student." });

        }

    },
    async deleteSingle( req, res ) {

        try {

            const deletedStudent = await Student.findByIdAndDelete( req.params.studentId );

            if( !deletedStudent )

                res.status(404).json({ default: "Student not found." });

            req.roomIo.emit( "dispatch", {
                type: "REMOVE_STUDENT",
                payload: deletedStudent._id
            } );

            res.json( { success: true } );
                
        } catch(err) {

            res.status(500).json({ default: "Unable to create student." });

        }

    }
}