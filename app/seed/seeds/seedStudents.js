const { Student, Classroom } = require("../../models");

module.exports = async () => {

    await Student.deleteMany({});

    const classroom = await Classroom.findOne({});

    const seedData = await require("../data/students")( classroom );

    const result = await Student.collection.insertMany(seedData);

    classroom.students = Object.values( result.insertedIds );

    await classroom.save();

    return result;

}