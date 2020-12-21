const SubSchemaController = require("../types/SubSchemaController");

const roomCtrl = require("../room");
const feedCtrl = require("../feed");

/**
 * TYPE DEFINITION IMPORTS
 * @typedef {import("../types/SubSchemaController").CreateSubDocOptions} CreateSubDocOptions
 * @typedef {import("~crsm/models/schema/UserSchema").UserDocument} UserDocument
 * @typedef {import("~crsm/models/schema/StudentSchema").StudentDocument} StudentDocument
 */

/**
 * @typedef CreateStudentOptionsData
 * @property {number} createdBy
 * 
 * @typedef {CreateSubDocOptions & CreateStudentOptionsData} CreateStudentOptions
 */

const makeFeed = async data => {

    const feed = await feedCtrl.createOne({ data }, { save: false });

    feed.pushItem( createdBy, "create" );

    return feed.save();

}

class StudentController extends SubSchemaController {

    constructor() {

        super( "student", roomCtrl );

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

        await makeFeed({
            _id: feedId,
            room: belongsTo,
            for: newStudent._id,
            in: "students"
        });

        return newStudent;

    }

    async createMany( { createdBy, belongsTo, data } ) {

        const students = [];

        for( const item of data ) students.push( await this.createOne( { createdBy, belongsTo, data: item } ) );

        return students;

    }

    async deleteOne({ docId }) {

        const deletedStudent = await super.deleteOne({ docId });

        await feedCtrl.deleteOne({ docId: deletedStudent.feed });

        return deletedStudent;

    }

}

module.exports = StudentController;