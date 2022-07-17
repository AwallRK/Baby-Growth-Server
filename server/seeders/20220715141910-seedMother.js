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
        name: "Sutijah",
        NIK: "222224440000",
        password: hashPassword("12345"),
        address: "Jl. Dua Ribu",
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sutiyem",
        NIK: "222224440001",
        password: hashPassword("12345"),
        address: "Jl. Empat Ribu",
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("MotherProfiles", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("MotherProfiles", null, {});
  },
};
