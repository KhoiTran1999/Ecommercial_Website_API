const Joi = require("joi");

const email = Joi.string().email().required();
const password = Joi.string().min(2).required();

const registerSchema = Joi.object({
  username: Joi.string().min(2).required(),
  email: email,
  password: password,
  phone: Joi.number(),
});

const loginSchema = Joi.object({
  email: email,
  password: password,
});

const otpSchema = Joi.object({
  email: email,
  otp: Joi.string().required(),
});

const resetPasswordSchema = Joi.object({
  oldPassword: password,
  newPassword: password,
});

const forgotPassword = Joi.object({
  email: email,
});

const resetPasswordWithTokenSchema = Joi.object({
  email,
  password,
  token: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  forgotPassword,
  resetPasswordWithTokenSchema,
};
