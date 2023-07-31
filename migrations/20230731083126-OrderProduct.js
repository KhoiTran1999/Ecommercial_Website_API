"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OderProduct", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: Order,
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: "id",
        },
      },
      deletedAt: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable("OderProduct");
  },
};
