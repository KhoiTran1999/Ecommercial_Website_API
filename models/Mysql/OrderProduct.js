const { sequelize } = require("../../database/connectMysql");
const { DataTypes } = require("sequelize");
const Order = require("./Order");
const Product = require("./Product");

const Order_Product = sequelize.define(
  "Order_Product",
  {
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
  },
  { paranoid: true }
);

module.exports = Order_Product;
