'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User', [{
      email: "sunny@gmail.com",
      password: "123456789",
      username: "sunny12",
    },{
      email: "sunrise@gmail.com",
      password: "123456789",
      username: "sunrise12",
    },{
      email: "jimmyneutron@gmail.com",
      password: "123456789",
      username: "jimmy12",

    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {})
  }
};
