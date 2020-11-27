const { NotFoundError } = require("../config/errors");
const { Room, Feed } = require("../models");

const ObjectId = require("mongoose").Types.ObjectId;

const getRoomWithStudents = roomId => Room.findById(roomId).select("students");
const findStudentById = async ( roomId, studentId ) => (await getRoomWithStudents(roomId)).students.id(studentId);
const findStudentByIdAndUpdate = async ( roomId, studentId, update ) => (await Room.findOneAndUpdate({ _id: roomId, "students._id": studentId }, {  $set: update }, { new: true }).select("students")).students.id(studentId);
const mapUpdateKeys = updates => Object.fromEntries(Object.entries(updates).map(([key,value])=>[`students.$.${key}`,value]));

/** HELPER METHODS **/

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

    const room = await Room.findByIdAndUpdate( roomId, update, { new: true } ).select("students");

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

/** CONTROLLER METHODS **/

const create = async ( { user, roomId, studentData } ) => {

    // Is this a request to make many students?
    if( studentData.students ) return await createMany( { studentData: studentData.students, user, roomId } );

    const {
        name,
        priorityLevel,
        assignedTo
    } = studentData;

    const data = {
        name,
        priorityLevel
    }

    if( assignedTo ) data.assignedTo = assignedTo;

    return await studentFactory( user._id, roomId, data );

}

const createMany = async ( { user, roomId, studentData } ) => {

    const students = [];

    for( const { name, priorityLevel, assignedTo } of studentData ) {

        const data = {
            name,
            priorityLevel,
        }

        if( assignedTo ) data.assignedTo = assignedTo;

        students.push( await studentFactory( user._id, roomId, data ) );

    }

    return students;

}

const getSingle = async ( { roomId, studentId } )  => {

    const student = await findStudentById( roomId, studentId );

    if( !student )

        throw new NotFoundError( "Student not found." );

    return student;

}

const update = async ( { roomId, studentId, studentData } ) => {
    
    const student = await findStudentByIdAndUpdate( roomId, studentId, mapUpdateKeys(studentData) );

    if( !student )

        throw new NotFoundError( "Student not found." );

}

const deleteSingle = async ( { roomId, studentId } )  => {

    const room = await getRoomWithStudents( roomId );
    const student = room.students.id( studentId );

    if( !student )

        throw new NotFoundError( "Student not found." );

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