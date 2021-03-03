'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    message: DataTypes.TEXT,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER
  }, {});

  message.associate = function(models) {
    // message.belongsTo(Model.user, {
    //   as: "senderId",
    //   foreignKey: "user.id",
    //   allowNull: false
    // })
    // message.belongsTo(Model.user, {
    //   as: "receiverId",
    //   foreignKey: "user.id",
    //   allowNull: false
    // })
  };
  return message
};

