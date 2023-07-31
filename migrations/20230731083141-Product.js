"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product", {
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
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product");
  },
};
