'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Message', [{
      messageTittle: "famous cafe",
      createdBy: 1
    },{
      messageTittle: "chill",
      createdBy: 2
    },{
      messageTittle: "new tv show",
      createdBy: 3
    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Message', null, {})
  }
};
