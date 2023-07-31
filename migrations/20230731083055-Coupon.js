"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Coupon", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      discount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(["percentage", "money"]),
      },
      startDay: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDay: {
        type: Sequelize.DATE,
      },
      createdAt: {
        type: Sequelize.STRING,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.STRING,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Coupon");
  },
};
