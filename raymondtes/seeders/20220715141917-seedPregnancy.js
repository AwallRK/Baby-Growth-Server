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
        MotherProfileId: 1,
        name: "Kehamilan Kedua Bu Sutijah",
        sudahLahir: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        MotherProfileId: 2,
        name: "Kehamilan Pertama Bu Sutiyem",
        sudahLahir: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Pregnancies", data, {});
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
