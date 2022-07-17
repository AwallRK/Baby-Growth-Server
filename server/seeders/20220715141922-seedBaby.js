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

    let data = [
      {
        PregnancyId: 2,
        beratAwal: 3,
        beratBulanan: "7,8,10,12",
        tanggalDicatat: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        PregnancyId: 1,
        beratAwal: 4,
        beratBulanan: "8,10,12,15",
        tanggalDicatat: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("BabyData", data, {});
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
