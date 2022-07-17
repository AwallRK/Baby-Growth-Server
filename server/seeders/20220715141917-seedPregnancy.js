"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const pregnancies = require("../data/pregnancies.json");
    pregnancies.forEach((pregnancy) => {
      pregnancy.createdAt = new Date();
      pregnancy.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Pregnancies", pregnancies, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Pregnancies", null, {});
  },
};
