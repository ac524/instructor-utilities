const { NotFoundError } = require("../config/errors");

const ObjectId = require("mongoose").Types.ObjectId;

const feedCtrl = require("./feed");
const roomCtrl = require("./room");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import('../models/schema/UserSchema').UserDocument} UserDocument
 * @typedef {import('../config/validation/definitions/studentValidation').StudentData} StudentData
 */

const getRoomWithStudents = async docId =>  await roomCtrl.findOne( { docId }, { select: "students" } );

const findStudentById = async ( roomId, studentId ) => (await getRoomWithStudents(roomId)).students.id(studentId);

const findStudentByIdAndUpdate = async ( roomId, studentId, update ) =>

    (await roomCtrl.updateOne(
            {
                search: { _id: roomId, "students._id": studentId },
                data: {  $set: update }
            },
            { select: "students" }
        ))
        .students
        .id(studentId);

const mapUpdateKeys = updates => Object.fromEntries(Object.entries(updates).map(([key,value])=>[`students.$.${key}`,value]));

/** HELPER METHODS **/

/**
 * @param {ObjectId} createdBy 
 * @param {ObjectId} roomId 
 * @param {StudentData} data 
 */
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

    const room = roomCtrl.updateOne( {
        docId: roomId,
        data: update
    }, { select: "students" } );

    const student = room.students.id( studentId );

    const feed = await feedCtrl.create({
        _id: feedId,
        room: roomId,
        for: studentId,
        in: "students"
    }, { save: false });

    feed.pushItem( createdBy, "create" );

    await feed.save();

    return student;

}

/** CONTROLLER METHODS **/

/**
 * @typedef CreateStudentOptions
 * @property {UserDocument} user
 * @property {ObjectId} roomId
 * @property {StudentData} studentData
 * 
 * @param {CreateStudentOptions} param0 
 */
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

/**
 * @typedef CreateStudentsOptions
 * @property {UserDocument} user
 * @property {ObjectId} roomId
 * @property {StudentData[]} studentData
 * 
 * @param {CreateStudentsOptions} param0 
 */
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

/**
 * @typedef GetStudentOptions
 * @property {ObjectId} roomId
 * @property {ObjectId} studentId
 * 
 * @param {GetStudentOptions} param0 
 */
const getSingle = async ( { roomId, studentId } )  => {

    const student = await findStudentById( roomId, studentId );

    if( !student )

        throw new NotFoundError( "Student not found." );

    return student;

}

/**
 * @typedef UpdateStudentOptions
 * @property {ObjectId} roomId
 * @property {ObjectId} studentId
 * @property {StudentData} studentData
 * 
 * @param {UpdateStudentOptions} param0 
 */
const update = async ( { roomId, studentId, studentData } ) => {
    
    const student = await findStudentByIdAndUpdate( roomId, studentId, mapUpdateKeys(studentData) );

    if( !student )

        throw new NotFoundError( "Student not found." );

}

/**
 * @typedef DeleteStudentOptions
 * @property {ObjectId} roomId
 * @property {ObjectId} studentId
 * 
 * @param {DeleteStudentOptions} param0 
 */
const deleteSingle = async ( { roomId, studentId } )  => {

    const room = await getRoomWithStudents( roomId );
    const student = room.students.id( studentId );

    if( !student )

        throw new NotFoundError( "Student not found." );

    student.remove();

    await room.save();

    await feedCtrl.deleteDoc({ feedId: student.feed });

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