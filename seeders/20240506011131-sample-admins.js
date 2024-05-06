'use strict';

const now = new Date()
const md5 = require('md5');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      { 
        name: "harry",
        email: "harry@gmail.com", 
        password: md5("12345"),
        createdAt : now, 
        updatedAt : now 
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};
