const Joi = require('joi')

const authSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(14).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(12).max(14).required(),
})

module.exports = {
    authSchema,
    loginSchema
}
