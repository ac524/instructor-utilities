const { Student } = require("../models");

module.exports = {
    async update( req, res ) {

        const update = {
            name: req.body.name,
            priorityLevel: req.body.priorityLevel,
            assignedTo: req.body.assignedTo
        };

        const student = await Student.findByIdAndUpdate( req.params.studentId, update, {new: true} );

        const classroomIo = req.app.get("classroomIo");

        classroomIo.to(req.roomId).emit( "dispatch", {
            type: "UPDATE_STUDENT",
            payload: student
         } );

        res.json({ success: true });

    }
}