"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BabyData", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PregnancyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pregnancies",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      beratAwal: {
        type: Sequelize.INTEGER,
      },
      beratBulanan: {
        type: Sequelize.STRING,
      },
      tanggalDicatat: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("BabyData");
  },
};
