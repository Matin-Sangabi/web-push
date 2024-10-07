const autoBind = require('auto-bind')
const { webPushService } = require('./webpish.service')

class webPushController {
    #service
    constructor() {
        autoBind(this)
        this.#service = webPushService
    }

    async subscribe(req, res, next) {
        try {
            const { _id } = req.user
            const { sub } = req.body
            const data = await this.#service.subscribe({ _id, sub })
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async unSubscribe(req, res, next) {
        try {
            const { _id } = req.user
            const data = await this.#service.unSubscribe({ _id })
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async pushNotification(req, res, next) {
        try {
            const { _id, message, title } = req.body
            const data = await this.#service.sendNotifications({
                _id,
                message,
                title,
            })
            return res.json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    webPushController: new webPushController(),
}
