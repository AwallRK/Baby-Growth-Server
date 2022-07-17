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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Name is required` },
          notNull: { msg: `Name is required` },
        },
      },
      NIK: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "NIK must be unique" },
        validate: {
          notEmpty: { msg: "NIK is required" },
          notNull: { msg: "NIK is required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Password is required` },
          notNull: { msg: `Password is required` },
        },
      },
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
