"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cancelled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cancelledReason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cancelledBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      couponId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Coupon",
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
      received_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("Order");
  },
};
