const { Classroom, Student } = require("../../models");

const setClassroom = async (req, res, next) => {
    try {

        req.classroom = await Classroom.findById( req.roomId ).select("staff");

        // console.log(req.classroom);

        if( !req.classroom ) return res.status(404).json({ default: "Classroom not found" });

        next();

    } catch(err) {

        res.status(500).json({ default: "Could not load classroom" });

    }
}

module.exports = {
    async fromBody(req, res, next) {

        req.roomId = req.body.roomId;

        await setClassroom(req, res, next);

    },
    async fromParam(req, res, next) {

        req.roomId = req.params.roomId;

        await setClassroom(req, res, next);

    },
    async fromStudent(req, res, next) {

        const student = await Student.findById( req.params.studentId );

        if( !student )
        
            return res.status(404).json({ default: "Student not found" });

        req.roomId = student.classroom;

        await setClassroom(req, res, next);

    }
}