const ObjectId = require("mongoose").Types.ObjectId;
const SubSchemaController = require("../types/SubSchemaController");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import("../types/SubSchemaController").CreateSubDocOptions} CreateSubDocOptions
 * @typedef {import("./models/schema/UserSchema").UserDocument} UserDocument
 * @typedef {import("./models/schema/StudentSchema").StudentDocument} StudentDocument
 */

/**
 * @typedef CreateStudentOptionsData
 * @property {object} data
 * @property {array} data.students
 * @property {ObjectId} roomId
 * 
 * @typedef UpdateStudentsOptionsData
 * @property {number} createdBy
 * 
 * @typedef {CreateSubDocOptions & CreateStudentOptionsData} CreateStudentOptions
 */

const makeFeed = async (data, createdBy, effect) => {

    const feed = await effect("feed").createOne({ data }, { save: false });

    feed.pushItem( createdBy, "create" );

    return feed.save();

}

const mapMetaData = (ctrl,metaData) => {
    return Object.fromEntries(
        Object
            .entries(metaData)
            .map( ([key,value]) => [`${ctrl.prop}.$.meta.${key}`,value])
    );
}

class StudentController extends SubSchemaController {

    constructor() {

        super( "student", "room" );

    }

    /**
     * @param {CreateSubDocOptions} param0
     * @returns {StudentDocument}
     */
    async createOne( { createdBy, belongsTo, data } ) {

        if( data.students ) return this.createMany( { createdBy, belongsTo, data: data.students } );

        const feedId = new ObjectId();

        const newStudent = await super.createOne({
            belongsTo,
            data: {
                feed: feedId,
                ...data
            }
        });

        await makeFeed(
          {
            _id: feedId,
            room: belongsTo,
            for: newStudent._id,
            in: "students",
          },
          createdBy._id,
          this.effect
        );

        return newStudent;

    }

    /**
     * @param {import("../types/SubSchemaController").UpdateSubDocOptions} param0
     * @returns {Object}
     */
    async updateOne( { data: { meta, ...data }, ...options } ) {

        return super.updateOne({
            ...options,
            data: {
                ...data,
                ...(meta ? { $set: mapMetaData(this,meta) } : {})
            }
        });

    }

    /**
     * 
     * @param {CreateStudentOptionsData} options 
     * @returns {Array}
     */
    async updateMany( { data: { students }, roomId } ) {

        const room = await this.effect('room').findOne( { docId: roomId }, { populate: [] } );
        
        const updatedStudents = students.map(({_id, ...updates}) => room.students.id(_id).set(updates));

        await room.save();

        return updatedStudents;

    }

    async createMany( { createdBy, belongsTo, data } ) {

        const students = [];

        for( const item of data ) students.push( await this.createOne( { createdBy, belongsTo, data: item } ) );

        return students;

    }

    async deleteOne({ docId }) {

        const deletedStudent = await super.deleteOne({ docId });

        if( deletedStudent.feed ) await this.effect("feed").deleteOne({ docId: deletedStudent.feed });

        return deletedStudent;

    }

}

module.exports = StudentController;