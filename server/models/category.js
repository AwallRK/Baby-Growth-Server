"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Article);
      // define association here
      this.hasMany(models.Article);
    }
  }
  Category.init(
    {
      names: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      imageUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
