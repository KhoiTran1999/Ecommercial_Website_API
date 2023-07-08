const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const authorize = require("../middleware/authorize");
const router = express.Router();
const orderController = require("../controllers/orderController")
const validator = require("../middleware/validator");
const createOrderSchema = require("../validation/orderSchema");

router.post("/", jwtAuth, authorize("customer"), validator(createOrderSchema), orderController.createOrder)

router.get("/", jwtAuth, authorize("customer"), orderController.getOrder)

router.get("/:id", jwtAuth, authorize("customer"), orderController.getOrderById)

module.exports = router