"use strict";

const { hashPassword } = require("../helpers/bcrypt");

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

    const babyData = require("../data/babyData.json");
    babyData.forEach((baby) => {
      baby.createdAt = baby.tanggalDicatat;
      baby.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("BabyData", babyData, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("BabyData", null, {});
  },
};
