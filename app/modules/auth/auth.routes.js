const { authController } = require('./auth.controller')

const router = require('express').Router()

router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = {
    authRoutes: router,
}
