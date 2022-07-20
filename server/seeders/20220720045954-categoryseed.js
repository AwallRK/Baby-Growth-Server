'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const categories = require("../data/category.json");
    categories.forEach((category) => {
      category.createdAt = new Date();
      category.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Categories", null, {});
  }
};
