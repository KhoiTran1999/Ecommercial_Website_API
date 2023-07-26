const mongoose = require("mongoose");

const registerOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    otp: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

registerOtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });

module.exports = mongoose.model("RegisterOtp", registerOtpSchema);
