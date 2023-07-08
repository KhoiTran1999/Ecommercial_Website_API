exports.env = {
  PORT: process.env.PORT || 3000,

  DATABASE: process.env.DATABASE || "nodejs_357",
  USERNAME_MYSQL: process.env.USERNAME_MYSQL || "root",
  PASSWORD: process.env.PASSWORD || "khoitran990120",
  HOST: process.env.HOST || "localhost",
  DIALECT: process.env.DIALECT || "mysql",

  SECRET_KEY: process.env.SECRET_KEY || "khoitran1999",
  EXPIRED_IN: process.env.EXPIRED_IN || "1d",
};
