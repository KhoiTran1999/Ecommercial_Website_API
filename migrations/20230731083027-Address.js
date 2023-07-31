"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
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
    await queryInterface.dropTable("Address");
  },
};
