const autoBind = require('auto-bind')
const { authSchema, loginSchema } = require('../../validation/auth.validate')
const { authService } = require('./auth.service')

class authController {
    #service
    constructor() {
        autoBind(this)
        this.#service = authService
    }

    async register(req, res, next) {
        try {
            await authSchema.validateAsync(req.body)
            const { name, email, password } = req.body
            const data = await this.#service.register({ name, email, password })
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            await loginSchema.validateAsync(req.body)
            const { email, password } = req.body
            const data = await this.#service.login({ password, email })
            return res.json({ message: 'login success', access: data })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    authController: new authController(),
}
