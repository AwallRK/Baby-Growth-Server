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
      Pregnancy.belongsTo(models.MotherProfile,{foreignKey:'MotherProfileId'});
      Pregnancy.hasOne(models.PregnancyData);
    }
  }
  Pregnancy.init(
    {
      MotherProfileId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      sudahLahir: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Pregnancy",
    }
  );
  return Pregnancy;
};
