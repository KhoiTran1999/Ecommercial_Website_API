const { sequelize } = require("../../database/connectMysql");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Coupon = require("./Coupon");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancelled_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelledReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cancelledBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    couponId: {
      type: DataTypes.INTEGER,
      references: {
        model: Coupon,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    received_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Order;
