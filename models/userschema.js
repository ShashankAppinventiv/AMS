'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userSchema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userSchema.init({
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.BLOB,
    mob_number: DataTypes.BIGINT,
    gender: DataTypes.STRING,
    dob: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'userSchema',
  });
  return userSchema;
};