"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pregnancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pregnancy.belongsTo(models.MotherProfile);
      Pregnancy.hasOne(models.PregnancyData);
      Pregnancy.hasOne(models.BabyData);
    }
  }
  Pregnancy.init(
    {
      MotherProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      name: DataTypes.STRING,
      sudahLahir: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (pregnancy) => {
          if (!pregnancy.sudahLahir) {
            pregnancy.sudahLahir = false;
          }
          return pregnancy;
        },
      },
      modelName: "Pregnancy",
    }
  );
  return Pregnancy;
};
