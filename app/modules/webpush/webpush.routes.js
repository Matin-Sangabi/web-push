const { webPushController } = require('./webpush.controller')

const router = require('express').Router()

router.post('/subscribe', webPushController.subscribe)
router.get('/unsubscribe', webPushController.unSubscribe)
router.post('/send-notification', webPushController.pushNotification)

module.exports = {
    webPushRoutes: router,
}
