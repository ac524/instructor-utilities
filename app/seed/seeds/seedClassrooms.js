const mongoose = require("mongoose");
const { Classroom, User, Staff } = require("../../models");

module.exports = async () => {

    await Classroom.deleteMany({});

    const seedData = await require("../data/classrooms")();

    const results = await Classroom.collection.insertMany(seedData);

    const classroom = await Classroom.findOne({});

    for( let i = 0; i < classroom.staff.length; i++ ) {

        let _id = classroom.staff[i];

        const staff = await Staff.findByIdAndUpdate( _id, { classroom: classroom._id} );

        await User.findByIdAndUpdate( staff.user, { $push: { classrooms: classroom._id } } );

    }

    return results;

}