const { Student } = require("../../models");

module.exports = {
    fromParam(req, res, next) {

        req.roomId = req.params.roomId;

        next();

    },
    async fromStudent(req, res, next) {

        const student = await Student.findById( req.params.studentId );

        if( !student )
        
            return res.status(404).json({ default: "Student not found" });

        req.roomId = student.classroom;

        next();

    }
}