const { Classroom, Feed } = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

const getRoomWithStudents = roomId => Classroom.findById(roomId).select("students");
const findStudentById = async ( roomId, studentId ) => (await getRoomWithStudents(roomId)).students.id(studentId);
const findStudentByIdAndUpdate = async ( roomId, studentId, update ) => (await Classroom.findOneAndUpdate({ _id: roomId, "students._id": studentId }, {  $set: update }, { new: true }).select("students")).students.id(studentId);
const mapUpdateKeys = updates => Object.fromEntries(Object.entries(updates).map(([key,value])=>[`students.$.${key}`,value]));

const studentFactory = async ( createdBy, roomId, data ) => {

    const feedId = new ObjectId();
    const studentId = new ObjectId();

    data._id = studentId;
    data.feed = feedId;

    const update = {
        $push: {
            students: data
        }
    };

    const room = await Classroom.findByIdAndUpdate( roomId, update, { new: true } ).select("students");

    const student = room.students.id( studentId );

    const feed = new Feed({
        _id: feedId,
        room: roomId,
        for: studentId,
        in: "students"
    });

    feed.pushItem( createdBy, "create" );

    await feed.save();

    return student;

}

const create = async ( { body, user, roomId } ) => {

    // Is this a request to make many students?
    if( body.students ) return await createMany( { body, user, roomId } );

    const {
        name,
        priorityLevel,
        assignedTo
    } = body;

    const data = {
        name,
        priorityLevel
    }

    if( assignedTo ) data.assignedTo = assignedTo;

    return await studentFactory( user._id, roomId, data );

}

const createMany = async ( { body, user, roomId } ) => {

    const studentData = body.students;
    const students = [];

    for( let i = 0; i < studentData.length; i++ ) {

        const data = {
            name: studentData[i].name,
            priorityLevel: studentData[i].priorityLevel,
        }

        if( studentData[i].assignedTo ) data.assignedTo = studentData[i].assignedTo;

        students.push( await studentFactory( user._id, roomId, data ) );

    }

    return students;

}

/**
 * All routes require isRoomMember middleware for authentication
 */
module.exports = {
    create,
    createMany,
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

            await Feed.findByIdAndDelete(student.feed);

            res.json( { success: true } );
                
        } catch(err) {

            console.log(err);

            res.status(500).json({ default: "Unable to delete student." });

        }

    }
}