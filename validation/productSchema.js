const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    price: Joi.number().min(1).required(),
    quantity: Joi.number().min(1).required(),
    categoryId: Joi.number().required()
})

module.exports = {productSchema}