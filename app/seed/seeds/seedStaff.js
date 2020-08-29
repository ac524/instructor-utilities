const { Staff } = require("../../models");

module.exports = async () => {

    await Staff.deleteMany({});

    const seedData = await require("../data/staff")();

    return await Staff.collection.insertMany(seedData);

}