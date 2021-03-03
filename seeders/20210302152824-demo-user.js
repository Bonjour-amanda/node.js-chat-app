'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: "sunny@gmail.com",
      password: "123456789",
      username: "sunny12",
      createdAt: "2018-01-01",
      updatedAt: "2018-01-19"
    },{
      email: "sunrise@gmail.com",
      password: "123456789",
      username: "sunrise12",
      createdAt: "2018-01-02",
      updatedAt: "2018-01-20"
    },{
      email: "jimmyneutron@gmail.com",
      password: "123456789",
      username: "jimmy12",
      createdAt: "2018-01-01",
      updatedAt: "2018-01-30"

    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};
