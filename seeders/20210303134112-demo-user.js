'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: "sunny@gmail.com",
      password: "123456789",
      username: "sunny12",
      createdAt: "2020-01-01",
      updatedAt: "2020-02-01"
    },{
      email: "sunrise@gmail.com",
      password: "123456789",
      username: "sunrise12",
      createdAt: "2020-01-01",
      updatedAt: "2020-01-31"
    },{
      email: "jimmyneutron@gmail.com",
      password: "123456789",
      username: "jimmy12",
      createdAt: "2020-01-10",
      updatedAt: "2020-02-19"

    }])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};