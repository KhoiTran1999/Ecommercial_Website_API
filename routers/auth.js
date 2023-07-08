const express = require("express");
const router = express.Router();
const validator = require("../middleware/validator");
const { registerSchema, loginSchema } = require("../validation/authSchema");
const authController = require("../controllers/authController")

router.post("/register", validator(registerSchema), authController.register)

router.post("/login", validator(loginSchema), authController.login)

module.exports = router