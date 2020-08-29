const { User } = require("../../models");

const seedData = require("../data/users");

module.exports = async () => {

    await User.deleteMany({});

    return await User.collection.insertMany(seedData);

}