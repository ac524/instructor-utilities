const { User } = require("../../app/controllers/definitions/models");

module.exports = async () => {
  await User.deleteMany({});

  const seedData = await require("../data/users")();

  return await User.collection.insertMany(seedData);
};
