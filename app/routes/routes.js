const AuthGuard = require('../common/guard/authGuard')
const { authRoutes } = require('../modules/auth/auth.routes')
const { userRoutes } = require('../modules/user/user.routes')
const { webPushRoutes } = require('../modules/webpush/webpush.routes')

const router = require('express').Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/web-push', AuthGuard, webPushRoutes)

module.exports = {
    allRoutes: router,
}
