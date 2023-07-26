const Joi = require("joi");

const couponSchema = Joi.object({
  name: Joi.string(),
  discount: Joi.number().min(1),
  type: Joi.string().valid("percentage", "money"),
  startDay: Joi.date(),
  endDay: Joi.date(),
});

module.exports = couponSchema;
