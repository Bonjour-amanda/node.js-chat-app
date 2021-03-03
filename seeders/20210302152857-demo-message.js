'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Message', [{
      messageTittle: "famous cafe",
      createdBy: 1,
      message: "we should go to that cafe"
    },{
      messageTittle: "chill",
      createdBy: 2,
      message: "we can talk about random stuff"
    },{
      messageTittle: "new tv show",
      createdBy: 3,
      message: "today tv show is very interesting"
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Message', null, {})
  }
};
