const AuthGuard = require('../common/guard/authGuard')
const { authRoutes } = require('../modules/auth/auth.routes')
const { userRoutes } = require('../modules/user/user.routes')

const router = require('express').Router()

router.use('/auth', authRoutes)
router.use('/user', AuthGuard , userRoutes)

module.exports = {
    allRoutes: router,
}
