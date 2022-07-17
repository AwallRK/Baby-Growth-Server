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
        username: "SuperAdmin",
        password: hashPassword("12345"),
        email: "superadmin@mail.com",
        role: "SuperAdmin",
        noRT: 99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Pak Karto",
        password: hashPassword("12345"),
        email: "karto@mail.com",
        role: "Admin",
        noRT: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Pak Didin",
        password: hashPassword("12345"),
        email: "didin@mail.com",
        role: "Admin",
        noRT: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
