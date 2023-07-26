const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator");
const {
  registerSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  forgotPassword,
  resetPasswordWithTokenSchema,
} = require("../validation/authSchema");
const authController = require("../controllers/authController");
const jwtAuth = require("../middleware/jwtAuth");

router.post("/register", validator(registerSchema), authController.register);

router.post("/login", validator(loginSchema), authController.login);

router.post("/verify", jwtAuth, authController.verifiedEmail);

router.patch(
  "/check-otp",
  jwtAuth,
  validator(otpSchema),
  authController.checkOtp
);

router.patch(
  "/reset-password",
  jwtAuth,
  validator(resetPasswordSchema),
  authController.resetPassword
);

router.post(
  "/forgot-password",
  validator(forgotPassword),
  authController.forgotPassword
);

router.patch(
  "/forgot-password",
  validator(resetPasswordWithTokenSchema),
  authController.resetPasswordWithToken
);

module.exports = router;
