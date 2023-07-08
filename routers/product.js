const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const authorize = require("../middleware/authorize");
const router = express.Router();
const validator = require("../middleware/validator");
const { productSchema } = require("../validation/productSchema");
const productController = require("../controllers/productController")

router.post("/", jwtAuth, authorize("owner"), validator(productSchema), productController.addProduct)

router.get("/", productController.getProduct)

router.get("/:id", productController.getProductById)

router.delete("/:id", jwtAuth, authorize("owner"), productController.deleteProduct)

router.patch("/:id", jwtAuth, authorize("owner"), productController.updateProduct)

module.exports = router