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
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      isVerify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "customer",
        references: {
          model: "Role",
          key: "slug",
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
    await queryInterface.dropTable("User");
  },
};
