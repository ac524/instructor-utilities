const { Classroom } = require("../../models");

module.exports = async () => {

    await Classroom.deleteMany({});

    const seedData = await require("../data/classrooms")();

    return await Classroom.collection.insertMany(seedData);

}