const Joi = require("joi");

const email = Joi.string().email().required();
const password = Joi.string().min(2).required();

const registerSchema = Joi.object({
    username: Joi.string().min(2).required(),
    email: email,
    password: password,
    phone: Joi.number(),
})

const loginSchema = Joi.object({
    email: email,
    password: password
})

module.exports = {registerSchema, loginSchema}