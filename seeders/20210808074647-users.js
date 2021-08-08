"use strict";
const faker = require("faker");

const user = {
  id: faker.datatype.uuid(),
  name: "Pelatihan ReactJs",
  email: "pelatihan@reactjs.com",
  address: "Bandung, Indonesia",
  createdAt: new Date(),
  updatedAt: new Date(),
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [user], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", null, {});
  },
};
