const { Sequelize } = require("sequelize");
const { env } = require("../config/env");

const sequelize = new Sequelize(
  env.DATABASE,
  env.USERNAME_MYSQL,
  env.PASSWORD,
  {
    host: env.HOST,
    dialect: env.DIALECT,
  }
);

const connectMysql = async () => {
  await sequelize.sync({ force: false, logging: false });
};

module.exports = { sequelize, connectMysql };
