const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const { addressSchema } = require("../validation/userSchema");
const router = express.Router();
const userController = require("../controllers/userController")
const validator = require("../middleware/validator")

router.patch("/address", jwtAuth, validator(addressSchema), userController.updateAddress)

router.get("/getMe", jwtAuth, userController.getMe)

module.exports = router