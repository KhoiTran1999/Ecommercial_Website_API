const { sequelize } = require("../../database/connectMysql");
const { DataTypes } = require("sequelize");

const Coupon = sequelize.define("Coupon", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(["percentage", "money"]),
  },
  startDay: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDay: {
    type: DataTypes.DATE,
  },
});

module.exports = Coupon;
