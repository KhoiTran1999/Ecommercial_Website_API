const express = require("express");
const { addressSchema } = require("../validation/userSchema");
const router = express.Router();
const userController = require("../controllers/userController")
const validator = require("../middleware/validator")

router.patch("/address", validator(addressSchema), userController.updateAddress)

router.get("/getMe", userController.getMe)

module.exports = router