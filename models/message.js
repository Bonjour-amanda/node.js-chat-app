'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    messageTittle: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  message.associate = function(models) {
    message.belongsTo(model.user, {
      as: "createdBy",
      foreignKey: "createdBy",
    })
  };
  return message;
};
