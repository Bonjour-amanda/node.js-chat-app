'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', [{
      senderId: 1,
      receiverId: 3,
      message: "we should go to that cafe",
      createdAt: "2020-01-01",
      updatedAt: "2020-02-01"
    },{
      senderId: 1,
      receiverId: 2,
      message: "we can talk about random stuff",
      createdAt: "2020-01-01",
      updatedAt: "2020-02-01"
    },{
      senderId: 2,
      receiverId: 3,
      message: "today tv show is very interesting",
      createdAt: "2020-01-01",
      updatedAt: "2020-02-01"
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {})
  }
};
