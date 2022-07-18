'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NeedCheck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NeedCheck.init({
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    IdRT: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NeedCheck',
  });
  return NeedCheck;
};