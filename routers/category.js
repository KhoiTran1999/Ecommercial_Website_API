const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const router = express.Router();
const authorize = require("../middleware/authorize")
const categoryController = require("../controllers/categoryController")

router.post("/", jwtAuth, authorize("owner"), categoryController.addCategory)

router.get("/", categoryController.getCategory)

router.delete("/", jwtAuth, authorize("owner"), categoryController.deleteCategory)

router.patch("/:id", jwtAuth, authorize("owner"), categoryController.updateCategory)

module.exports = router