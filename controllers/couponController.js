const asyncMiddleware = require("../middleware/asyncMiddleware");
const Coupon = require("../models/Mysql/Coupon");
const ErrorResponse = require("../responses/errorResponse");

const addCoupon = asyncMiddleware(async (req, res, next) => {
  const { name, discount, type, startDay, endDay } = req.body;

  const StartDay = new Date(startDay);
  const EndDay = new Date(endDay);
  const Today = new Date();
  if (StartDay > EndDay) {
    throw new ErrorResponse(409, "startDay can not larger endDay");
  }

  if (StartDay < Today) {
    throw new ErrorResponse(
      409,
      "startDay must be equal or larger than present"
    );
  }

  await Coupon.create({
    name,
    discount,
    type,
    startDay: StartDay,
    endDay: EndDay,
  });

  res.status(201).json({
    success: true,
    message: "Created Coupon successfully!",
  });
});

const getCoupon = asyncMiddleware(async (req, res, next) => {
  const coupon = await Coupon.findAll({});
  const validCoupon = coupon.filter((val) => new Date(val.endDay) > new Date());

  res.json({
    success: true,
    data: validCoupon,
  });
});

const deleteCoupon = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const afftectCount = await Coupon.destroy({ where: id });

  if (!afftectCount) {
    throw new ErrorResponse(404, "Coupon not found!");
  }

  res.json({
    success: true,
    message: "Deleted successfully!",
  });
});

module.exports = { addCoupon, getCoupon, deleteCoupon };
