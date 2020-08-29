const mongoose = require("mongoose");
const { Classroom, User, Staff } = require("../../models");

module.exports = async () => {

    await Classroom.deleteMany({});

    const staff = await Staff.find({});

    const seedData = await require("../data/classrooms")( staff );

    const results = await Classroom.collection.insertMany(seedData);

    const classroom = await Classroom.findOne({});

    for( let i = 0; i < classroom.staff.length; i++ ) {

        let _id = classroom.staff[i];

        // Add the classroom id to each staff
        const staff = await Staff.findByIdAndUpdate( _id, { classroom: classroom._id} );

        // Push the classroom id to the user
        await User.findByIdAndUpdate( staff.user, { $push: { classrooms: classroom._id } } );

    }

    return results;

}