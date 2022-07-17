"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const mothers = require("../data/mothers.json");
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
    mothers.forEach((mother) => {
      mother.password = hashPassword(mother.password);
      mother.createdAt = new Date();
      mother.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("MotherProfiles", mothers, {});
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
