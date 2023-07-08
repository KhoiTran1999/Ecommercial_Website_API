const Joi = require("joi");

const addressSchema = Joi.object({
    city: Joi.string().min(2),
    province: Joi.string().min(2),
    address: Joi.string().min(2),
    zip: Joi.string().min(2),
})


module.exports = {addressSchema}