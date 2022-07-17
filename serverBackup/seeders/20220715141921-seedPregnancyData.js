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

    let data = [
      {
        PregnancyId: 1,
        beratAwal: 50.5,
        beratBulanan: "55.6,58.5,63,69",
        tanggalDicatat: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        PregnancyId: 2,
        beratAwal: 60,
        beratBulanan: "65,69,78,80,89,94",
        tanggalDicatat: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("PregnancyData", data, {});
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
