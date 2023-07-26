const express = require("express");
const authorize = require("../middleware/authorize");
const router = express.Router();
const roleController = require("../controllers/roleController")

router.patch("/makeOwner", authorize("admin"), roleController.makeOwner)

router.patch("/makeCustomer", authorize("admin"), roleController.makeCustomer)

module.exports = router