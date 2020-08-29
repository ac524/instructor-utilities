const mongoose = require("mongoose");
const { Classroom, User, Staff } = require("../../models");

module.exports = async () => {

    await Classroom.deleteMany({});

    const staff = await Staff.find({});

    const seedData = await require("../data/classrooms")( staff );

    const results = await Classroom.collection.insertMany(seedData);

    const classroomId = results.insertedIds['0'];

    for( let i = 0; i < staff.length; i++ ) {

        let { _id, user } = staff[i];

        // Add the classroom id to each staff
        await Staff.findByIdAndUpdate( _id, { classroom: classroomId } );

        // Push the classroom id to the user
        await User.findByIdAndUpdate( user, { $push: { classrooms: classroomId } } );

    }

    return results;

}