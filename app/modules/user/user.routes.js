const { userController } = require('./user.controller')

const router = require('express').Router()

router.get('/', userController.getUser)
router.get('/all-user', userController.getAllUsers)



module.exports = {
    userRoutes : router
}