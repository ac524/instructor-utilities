const { Staff, User } = require("../../models");

module.exports = async () => {

    await Staff.deleteMany({});

    const users = await User.find({});

    const seedData = await require("../data/staff")( users );

    return await Staff.collection.insertMany(seedData);

}