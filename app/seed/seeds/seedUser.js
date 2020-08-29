const { User } = require("../../models");

module.exports = async () => {

    await User.deleteMany({});

    const seedData = await require("../data/users")();

    return await User.collection.insertMany(seedData);

}