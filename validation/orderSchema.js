const Joi = require("joi");

const note = Joi.string().allow(null, "");
const status = Joi.string().valid("pending", "approved", "delivery", "done");

const createOrderSchema = Joi.object({
  note,
  productList: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        quantity: Joi.number().required(),
      })
    )
    .required(),
  couponId: Joi.number(),
});

const detailSchema = Joi.object({
  note,
  status,
  received_at: Joi.date(),
});

const cancelSchema = Joi.object({
  cancelledReason: Joi.string().required(),
});

const statusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "delivery", "done")
    .required(),
});

module.exports = {
  createOrderSchema,
  detailSchema,
  statusSchema,
  cancelSchema,
};
