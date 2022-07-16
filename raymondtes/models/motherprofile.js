"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MotherProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MotherProfile.belongsTo(models.User);
      MotherProfile.hasMany(models.Pregnancy);
    }
  }
  MotherProfile.init(
    {
      name: DataTypes.STRING,
      NIK: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MotherProfile",
    }
  );
  return MotherProfile;
};