const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController")
const validator = require("../middleware/validator");
const schema = require("../validation/orderSchema");
const authorize = require("../middleware/authorize");

router.post("/", authorize("customer"), validator(schema.createOrderSchema), orderController.createOrder)

router.get("/", authorize("customer", "owner"), orderController.getOrder)

router.get("/status", authorize("customer", "owner"), validator(schema.statusSchema), orderController.getOrderByStatus)

router.get("/:id", authorize("customer", "owner"), orderController.getOrderById)

router.delete("/:id", authorize("owner"), orderController.deleteOrderById)

router.patch("/done/:id", authorize("owner"), orderController.setOrderDone)

router.patch("/cancel/:id", authorize("customer", "owner"), validator(schema.cancelSchema), orderController.cancelledOrder)

router.patch("/delivery/:id", authorize("owner"), orderController.setOrderDelivery)

router.patch("/approved/:id", authorize("owner"), orderController.setOrderApproved)

router.patch("/note/:id", authorize("customer"), validator(schema.detailSchema), orderController.updateNote)

module.exports = router