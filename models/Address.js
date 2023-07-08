const {sequelize} = require("../database/connectDB");
const {DataTypes} = require("sequelize");
const User = require("./User");

const Address = sequelize.define("Address", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id"
        }
    }
})

module.exports = Address