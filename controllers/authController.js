const { env } = require("../config/env");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const User = require("../models/Mysql/User");
const Address = require("../models/Mysql/Address");
const ErrorResponse = require("../responses/errorResponse");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const EmailService = require("../services/mail");
const generateOtp = require("../utiles/otp");
const registerOtp = require("../models/Mongo/registerOtp");
const registerToken = require("../models/Mongo/registerToken");

const register = asyncMiddleware(async (req, res, next) => {
  const { username, email, password, phone } = req.body;

  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new ErrorResponse(409, "Email have been used!");
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const newUser = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });
  await Address.create({ userId: newUser.id });

  res.status(201).json({
    success: true,
    message: "registerd successfully!",
  });
});

const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ErrorResponse(401, "Invalid Email/Password");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new ErrorResponse(401, "Invalid Email/Password");
  }

  const token = jwt.sign({ id: user.id }, env.SECRET_KEY, {
    expiresIn: env.EXPIRED_IN,
  });

  res.status(200).json({
    success: true,
    token,
  });
});

const verifiedEmail = asyncMiddleware(async (req, res, next) => {
  const { id } = req.user;
  const otp = generateOtp();
  const user = await User.findByPk(id);
  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  if (user.isVerify) {
    throw new ErrorResponse(409, "Your account have been verified");
  }

  await registerOtp.create({ email: user.email, otp });

  EmailService.sendMail({
    to: user.email,
    subject: "OTP code",
    html: `<h2>Hi ${user.username},</h2>
<p>You recently requested to verify your email for your <strong>${user.username}</strong> account. <br>Copy OTP code and paste it in our website to verify your email. <strong>This OTP code is only valid for the next 20 seconds.</strong></p>
<div style= "display: flex; justify-content: center; margin: 10px">
    <span style="background-color: rgb(34,188,102); color: white; font-size: 30px; padding: 4px; border-radius: 2px">${otp}</span>
</div>
<p>Thanks,
  <br>The Ecommercial Website Team</p>`,
  });

  res.status(201).json({
    success: true,
    message: "OTP code have been sent to your Email",
  });
});

const checkOtp = asyncMiddleware(async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await registerOtp.findOne({ email, otp });
  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  if (user.otp != otp) {
    throw new ErrorResponse(401, "Unauthorize");
  }

  const updateUser = User.update(
    { isVerify: true },
    { where: { email: user.email } }
  );
  const deleteOtp = registerOtp.deleteOne({ otp });

  Promise.all([updateUser, deleteOtp]);

  res.status(200).json({
    success: true,
    message: "Your email have been verified",
  });
});

const resetPassword = asyncMiddleware(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (oldPassword === newPassword) {
    throw new ErrorResponse(
      409,
      "New password must be different with old password"
    );
  }

  const user = await User.findByPk(id);

  const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new ErrorResponse(401, "Unauthorize");
  }

  const hashedNewPassword = bcrypt.hashSync(newPassword, 12);
  user.password = hashedNewPassword;
  user.save();

  res.status(200).json({
    success: true,
    message: "Your password have been updated",
  });
});

const forgotPassword = asyncMiddleware(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ErrorResponse(404, "User not found");
  }

  const token = crypto.randomBytes(20).toString("hex");
  try {
    await registerToken.create({ email: user.email, token });
  } catch (error) {
    throw new ErrorResponse(409, "Token have been created already");
  }

  EmailService.sendMail({
    to: user.email,
    subject: "Forgot password",
    text: "Your token exists only 2 minutes",
    html: `
    <h2>Hi ${user.username},</h2>
<p>You recently requested to reset your password for your <strong>${user.username}</strong> account. <br>Click the button below to reset your password. <strong>This Token is only valid for the next 2 minutes.</strong></p>
<div style= "display: flex; justify-content: center; margin: 10px">
    <a href="http://localhost:3000/forgot-password/${token}" style="background-color: rgb(34,188,102); color: white; font-size: 30px; padding: 4px; border-radius: 2px">Click here</a>
</div>
<p>Thanks,
  <br>The Ecommercial Website Team</p>
    `,
  });

  res.status(201).json({
    success: true,
    message: "Please check your Email",
  });
});

const resetPasswordWithToken = asyncMiddleware(async (req, res, next) => {
  const { email, password, token } = req.body;

  const userToken = await registerToken.findOne({ email, token });

  if (!userToken) {
    throw new ErrorResponse(404, "Token not found");
  }

  if (userToken.token !== token) {
    throw new ErrorResponse(400, "Invalid Token");
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  await User.update({ password: hashedPassword }, { where: { email } });

  res.status(200).json({
    success: true,
    message: "Your password have been updated",
  });
});

module.exports = {
  register,
  login,
  verifiedEmail,
  checkOtp,
  resetPassword,
  forgotPassword,
  resetPasswordWithToken,
};
