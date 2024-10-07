const autoBind = require('auto-bind')
const { webPushModel } = require('../../models/webPush')
const { userModel } = require('../../models/users')
const createError = require('http-errors')
const webpush = require('web-push')

class webPushService {
    #model
    #userModel
    constructor() {
        autoBind(this)
        this.#model = webPushModel
        this.#userModel = userModel
    }

    async subscribe(subDto) {
        const { sub, _id } = subDto
        const subscription = JSON.parse(sub)

        const push = await this.findSubScribeUser(_id)
        if (push) {
            // edit
            const update = await this.#model.findByIdAndUpdate(
                push?._id,
                { ...subscription },
                { new: true }
            )
            return update
        } else {
            // create
            const create = this.#model.create({
                user: _id,
                ...subscription,
            })
            return create
        }
    }

    async unSubscribe(subDto) {
        const { _id } = subDto
        const push = await this.findSubScribeUser(_id)
        if (!push) {
            throw createError[400]('you must first subscribe notifications')
        }
        const update = await this.#model.findOneAndDelete(
            { user: _id },
            { new: true }
        )
        return update
    }

    async sendNotifications(notificationDto) {
        const { _id, message, title } = notificationDto
        const sub = await this.findSubScribeUser(_id)
        if (!sub) {
            throw createError[400]('not find sub')
        }

        const subscriptions = {
            endpoint: sub?.endpoint,
            expirationTime: sub?.expirationTime,
            keys : sub?.keys,
        }
        
        webpush.sendNotification(
            subscriptions,
            JSON.stringify({ title, body: message })
        )
        return "notification send success"
    }

    async findSubScribeUser(user) {
        const push = await this.#model.findOne({ user }).lean()
        return push
    }
}

module.exports = {
    webPushService: new webPushService(),
}
