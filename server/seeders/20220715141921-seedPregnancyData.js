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

    const pregnancyData = require("../data/pregnancyData.json");
    pregnancyData.forEach((pregnancy) => {
      pregnancy.createdAt = pregnancy.tanggalDicatat;
      pregnancy.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("PregnancyData", pregnancyData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("PregnancyData", null, {});
  },
};
