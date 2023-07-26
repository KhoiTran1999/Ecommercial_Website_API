const mongoose = require("mongoose");
const { env } = require("../config/env");

class MongoDB {
  static connect() {
    mongoose
      .connect(env.MONGO_URI)
      .then(() => {
        console.log("MongoDB have been connected");
      })
      .catch((err) => console.log(err));

    const conn = mongoose.connection;
    conn.once("open", () => {
      this.bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: env.MONGO_BUCKET,
      });
    });
  }
}

module.exports = MongoDB;
