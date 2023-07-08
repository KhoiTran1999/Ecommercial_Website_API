const Joi = require("joi");

const createOrderSchema = Joi.object({
    note: Joi.string().allow(null, ""),
    productList: Joi.array().items(
        Joi.object({
            id: Joi.number().required(),
            quantity: Joi.number().required()
        })
    ).required()
})

module.exports = createOrderSchema