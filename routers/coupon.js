const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");
const validator = require("../middleware/validator");
const couponSchema = require("../validation/couponSchema");
const authorize = require("../middleware/authorize");

router.post(
  "/",
  validator(couponSchema),
  authorize("owner"),
  couponController.addCoupon
);

router.get("/", validator(couponSchema), couponController.getCoupon);

router.delete(
  "/:id",
  validator(couponSchema),
  authorize("owner"),
  couponController.deleteCoupon
);

module.exports = router;
