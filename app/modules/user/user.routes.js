const { userController } = require('./user.controller')

const router = require('express').Router()

router.get('/', userController.getUser)


module.exports = {
    userRoutes : router
}