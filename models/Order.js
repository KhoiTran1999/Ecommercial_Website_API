const {sequelize} = require("../database/connectDB");
const {DataTypes} = require("sequelize");
const User = require("./User");

const Order = sequelize.define("Order", {
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    },
    received_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
})

module.exports = Order