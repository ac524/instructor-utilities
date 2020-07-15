'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'test@myuser.com',
        password: bcrypt.hashSync('test', bcrypt.genSaltSync(10), null),
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        id: 2,
        email: 'test2@myuser.com',
        password: bcrypt.hashSync('test2', bcrypt.genSaltSync(10), null),
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {});

    await queryInterface.bulkInsert('Lists', [
      {
        id: 1,
        name: "Test List",
        createdAt: new Date,
        updatedAt: new Date,
        UserId: 1
      }
    ]);

    await queryInterface.bulkInsert('ListItem', [
      {
        id: 1,
        name: "Item 1",
        ListId: 1
      }
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Lists', null, {});
  }
};
