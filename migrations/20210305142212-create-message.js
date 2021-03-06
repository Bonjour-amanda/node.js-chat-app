'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      senderId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
          as: 'senderId'
        }
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id',
          as: 'reiverId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};