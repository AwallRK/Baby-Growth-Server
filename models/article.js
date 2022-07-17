'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.User,{foreignKey:'IdUser'});
      this.belongsTo(models.Category,{foreignKey:'CategoryId'});
    }
  }
  Article.init({
    name: DataTypes.STRING,
    text: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    CategoryId: DataTypes.INTEGER,
    IdUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};