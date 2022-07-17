"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pregnancies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MotherProfileId: {
        type: Sequelize.INTEGER,
        references: {
          model: "MotherProfiles",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      name: {
        type: Sequelize.STRING,
      },
      sudahLahir: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pregnancies");
  },
};
