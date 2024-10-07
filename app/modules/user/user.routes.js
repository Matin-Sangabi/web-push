const AuthGuard = require('../../common/guard/authGuard')
const { userController } = require('./user.controller')

const router = require('express').Router()

router.get('/', AuthGuard, userController.getUser)
router.get('/all-user', userController.getAllUsers)



module.exports = {
    userRoutes : router
}