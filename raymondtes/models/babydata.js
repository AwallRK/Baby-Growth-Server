'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BabyData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BabyData.init({
    PregnancyId: DataTypes.INTEGER,
    beratAwal: DataTypes.INTEGER,
    beratBulanan: DataTypes.STRING,
    tanggalDicatat: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BabyData',
  });
  return BabyData;
};