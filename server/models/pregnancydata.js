"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PregnancyData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PregnancyData.belongsTo(models.Pregnancy);
    }
  }
  PregnancyData.init(
    {
      PregnancyId: DataTypes.INTEGER,
      beratAwal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: { msg: `beratAwal is required` },
          notNull: { msg: `beratAwal is required` },
        },
      },
      beratBulanan: DataTypes.STRING,
      tanggalDicatat: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PregnancyData",
    }
  );
  return PregnancyData;
};
