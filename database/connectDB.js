const {Sequelize} = require("sequelize");
const { env } = require("../config/env");

const sequelize = new Sequelize(env.DATABASE, env.USERNAME_MYSQL, env.PASSWORD, {
    host: env.HOST,
    dialect: env.DIALECT,
})

const connectDB = async () => {
    await sequelize.sync({alter: false});
}

module.exports = {sequelize, connectDB}