const { Feed, Room, User } = require("../../app/controllers/models");

module.exports = async () => {

    await Room.deleteMany({});
    await Feed.deleteMany({});

    const users = await User.find({});

    const seedData = await require("../data/classrooms")( users );

    const results = await Room.collection.insertMany(seedData);

    const classroomId = results.insertedIds['0'];

    for( let i = 0; i < users.length; i++ )

        // Push the classroom id to the user
        await users[i].update( { $push: { classrooms: classroomId } } );

    return results;

}