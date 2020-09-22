const { Classroom } = require("../models");
const ioEmit = require("./utils/ioEmit");

const getRoomWithStudents = roomId => Classroom.findById(roomId).select("students");
const findStudentById = async ( roomId, studentId ) => (await getRoomWithStudents(roomId)).students.id(studentId);
const findStudentByIdAndUpdate = async ( roomId, studentId, update ) => (await Classroom.findOneAndUpdate({ _id: roomId, "students._id": studentId }, {  $set: update }, { new: true }).select("students")).students.id(studentId);
const mapUpdateKeys = updates => Object.fromEntries(Object.entries(updates).map(([key,value])=>[`students.$.${key}`,value]));

/**
 * All routes require isRoomMember middleware for authentication
 */
module.exports = {
    async create( req, res ) {

        try {

            const data = {
                name: req.body.name,
                priorityLevel: req.body.priorityLevel
            }

            if( req.body.assignedTo ) data.assignedTo = req.body.assignedTo;

            const update = {
                $push: {
                    students: data
                }
            };

            const room = await Classroom.findByIdAndUpdate( req.roomId, update, { new: true } ).select("students");

            const student = room.students[ room.students.length - 1 ];

            ioEmit( req, req.roomIo, "dispatch", {
                type: "ADD_STUDENT",
                payload: student
            } );

            res.json( student );
                
        } catch(err) {

            console.log(err);

            res.status(500).json({ default: "Unable to create student." });

        }

    },
    async getSingle( req, res ) {

        try {


            const student = await findStudentById( req.roomId, req.params.studentId ); // (await Classroom.findById(req.roomId).select("students")).students.id(req.params.studentId);

            if( !student )

                res.status(404).json({ default: "Student not found." });

            res.json( student );
                
        } catch(err) {

            res.status(500).json({ default: "Unable to get student." });

        }

    },
    async update( req, res ) {

        try {

            const update = ["name","priorityLevel","assignedTo"].reduce((update, name) => {

                if( !req.body.hasOwnProperty(name) ) return update;

                return { ...update, [name]: req.body[name] };

            }, {});
            
            const student = await findStudentByIdAndUpdate( req.roomId, req.params.studentId, mapUpdateKeys(update) );

            if( !student )

                res.status(404).json({ default: "Student not found." });

            ioEmit( req, req.roomIo, "dispatch", {
                type: "UPDATE_STUDENT",
                payload: {
                    _id: req.params.studentId,
                    ...update
                }
            } );

            res.json({ success: true });
                
        } catch(err) {

            console.log(err);

            res.status(500).json({ default: "Unable to update student." });

        }

    },
    async deleteSingle( req, res ) {

        try {

            const room = await getRoomWithStudents(req.roomId);
            const student = room.students.id(req.params.studentId);

            if( !student )

                res.status(404).json({ default: "Student not found." });

            student.remove();

            await room.save();

            req.roomIo.emit( "dispatch", {
                type: "REMOVE_STUDENT",
                payload: student._id
            } );

            res.json( { success: true } );
                
        } catch(err) {

            console.log(err);

            res.status(500).json({ default: "Unable to delete student." });

        }

    }
}