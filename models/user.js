'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.message, {
        onDelete: 'CASCADE',
        key: 'id',
        foreignKey: 'senderId'
      });
      user.hasMany(models.message, {
        onDelete: 'CASCADE',
        key: 'id',
        foreignKey: "receiverId"
      })
      return user;
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};