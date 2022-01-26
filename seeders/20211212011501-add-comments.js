'use strict';

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
   let data = [
     {
      UserId: 2,
      PhotoId: 4,
      comment: "Good casting and movie",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      UserId: 3,
      PhotoId: 5,
      comment: "Good casting and movie",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      UserId: 2,
      PhotoId: 6,
      comment: "Good casting and movie",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      UserId: 3,
      PhotoId: 6,
      comment: "Good casting and movie",
      createdAt: new Date(),
      updatedAt: new Date()
     },

   ]
   await queryInterface.bulkInsert('Comments', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
