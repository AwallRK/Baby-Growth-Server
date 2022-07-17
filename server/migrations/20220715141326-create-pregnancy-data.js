"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PregnancyData", {
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
        unique: true,
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      beratAwal: {
        allowNull: false,
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("PregnancyData");
  },
};
