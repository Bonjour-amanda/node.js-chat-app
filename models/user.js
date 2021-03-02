'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('users', {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING
    }, {});
    user.associate = function(models) {
      
    };
    return user;
  };