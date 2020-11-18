const { RouteError } = require("../config/errors/RouteError");
const { Classroom, Feed } = require("../models");

const ObjectId = require("mongoose").Types.ObjectId;

const getRoomWithStudents = roomId => Classroom.findById(roomId).select("students");
const findStudentById = async ( roomId, studentId ) => (await getRoomWithStudents(roomId)).students.id(studentId);
const findStudentByIdAndUpdate = async ( roomId, studentId, update ) => (await Classroom.findOneAndUpdate({ _id: roomId, "students._id": studentId }, {  $set: update }, { new: true }).select("students")).students.id(studentId);
const mapUpdateKeys = updates => Object.fromEntries(Object.entries(updates).map(([key,value])=>[`students.$.${key}`,value]));

const studentFactory = async ( createdBy, roomId, data ) => {

    const feedId = new ObjectId();
    const studentId = new ObjectId();

    const update = {
        $push: {
            students: {
                ...data,
                _id: studentId,
                feed: feedId
            }
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

const getSingle = async ( { roomId, studentId } )  => {

    const student = await findStudentById( roomId, studentId ); // (await Classroom.findById(req.roomId).select("students")).students.id(req.params.studentId);

    if( !student )

        throw new RouteError( 404, "Student not found." );

    return student;

}

const update = async ( { roomId, studentId, body } ) => {

    const update = ["name","priorityLevel","assignedTo"].reduce((update, name) => {

        if( !body.hasOwnProperty(name) ) return update;

        return { ...update, [name]: body[name] };

    }, {});
    
    const student = await findStudentByIdAndUpdate( roomId, studentId, mapUpdateKeys(update) );

    if( !student )

        throw new RouteError( 404, "Student not found." );

}

const deleteSingle = async ( { roomId, studentId } )  => {

    const room = await getRoomWithStudents( roomId );
    const student = room.students.id( studentId );

    if( !student )

        throw new RouteError( 404, "Student not found." );

    student.remove();

    await room.save();

    await Feed.findByIdAndDelete(student.feed);

}

/**
 * All routes require isRoomMember middleware for authentication
 */
module.exports = {
    create,
    createMany,
    getSingle,
    update,
    deleteSingle
}