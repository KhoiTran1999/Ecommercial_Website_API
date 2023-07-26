exports.env = {
  PORT: process.env.PORT || 3000,

  DATABASE: process.env.DATABASE || "nodejs_357",
  USERNAME_MYSQL: process.env.USERNAME_MYSQL || "root",
  PASSWORD: process.env.PASSWORD || "khoitran990120",
  HOST: process.env.HOST || "localhost",
  DIALECT: process.env.DIALECT || "mysql",

  SECRET_KEY: process.env.SECRET_KEY || "khoitran1999",
  EXPIRED_IN: process.env.EXPIRED_IN || "1d",

  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nodejs_357",
  MONGO_BUCKET: process.env.MONGO_BUCKET || "uploads",

  CLIENT_ID:
    process.env.CLIENT_ID ||
    "278761586723-2q5obdser5frfqlrfm9or912mapo002n.apps.googleusercontent.com",
  CLIENT_SECRET:
    process.env.CLIENT_SECRET || "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",
  REFRESH_TOKEN:
    process.env.REFRESH_TOKEN ||
    "1//04iPHY4xM9qtzCgYIARAAGAQSNwF-L9Irf3JHeencu5P0bt_1DwTAohuFHJbZpfDm_aRZTWPYXbhvEen0dcZnHBRmKM-_pWEdk_4",
  EMAIL: process.env.EMAIL || "tranquockhoi1999@gmail.com",
};
