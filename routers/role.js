const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const authorize = require("../middleware/authorize");
const router = express.Router();
const roleController = require("../controllers/roleController")

router.patch("/makeOwner", jwtAuth, authorize("admin"), roleController.makeOwner)

router.patch("/makeCustomer", jwtAuth, authorize("admin"), roleController.makeCustomer)

module.exports = router