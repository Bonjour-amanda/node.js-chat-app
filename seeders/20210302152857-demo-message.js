'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', [{
      messageTittle: "famous cafe",
      createdBy: 1,
      message: "we should go to that cafe",
      createdAt: "2018-02-01",
      updatedAt: "2018-03-01"
    },{
      messageTittle: "chill",
      createdBy: 2,
      message: "we can talk about random stuff",
      createdAt: "2018-02-01",
      updatedAt: "2018-03-02"
    },{
      messageTittle: "new tv show",
      createdBy: 3,
      message: "today tv show is very interesting",
      createdAt: "2018-01-01",
      updatedAt: "2018-05-01"
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {})
  }
};
